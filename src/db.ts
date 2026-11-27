import Database from 'better-sqlite3';
import { config } from './config.js';

// Schema e CONTRACTUL dintre A și B: dacă o schimbați, anunțați-vă.
export const db = new Database(config.dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id  TEXT PRIMARY KEY,           -- Discord user id
    xp  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS deadlines (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    guild_id      TEXT    NOT NULL,
    channel_id    TEXT    NOT NULL,  -- unde se trimit reminderele
    subject       TEXT    NOT NULL,  -- materia
    title         TEXT    NOT NULL,
    due_at        INTEGER NOT NULL,  -- timestamp în ms
    created_by    TEXT    NOT NULL,
    reminded_24h  INTEGER NOT NULL DEFAULT 0,
    reminded_1h   INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    guild_id      TEXT    NOT NULL,
    channel_id    TEXT    NOT NULL,
    started_by    TEXT    NOT NULL,
    started_at    INTEGER NOT NULL,  -- ms
    duration_min  INTEGER NOT NULL,
    finished      INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS session_participants (
    session_id  INTEGER NOT NULL REFERENCES sessions(id),
    user_id     TEXT    NOT NULL,
    PRIMARY KEY (session_id, user_id)
  );
`);

// ---------- Tipuri ----------
export interface Deadline {
  id: number;
  guild_id: string;
  channel_id: string;
  subject: string;
  title: string;
  due_at: number;
  created_by: string;
  reminded_24h: number;
  reminded_1h: number;
}

export interface UserRow {
  id: string;
  xp: number;
}

// ---------- Users / XP (folosit de B) ----------
export function addXp(userId: string, amount: number): void {
  db.prepare(
    `INSERT INTO users (id, xp) VALUES (?, ?)
     ON CONFLICT(id) DO UPDATE SET xp = xp + excluded.xp`,
  ).run(userId, amount);
}

export function getTopUsers(limit = 10): UserRow[] {
  return db.prepare(`SELECT id, xp FROM users ORDER BY xp DESC LIMIT ?`).all(limit) as UserRow[];
}

// ---------- Deadlines (folosit de A) ----------
export function addDeadline(d: Omit<Deadline, 'id' | 'reminded_24h' | 'reminded_1h'>): number {
  const res = db
    .prepare(
      `INSERT INTO deadlines (guild_id, channel_id, subject, title, due_at, created_by)
       VALUES (@guild_id, @channel_id, @subject, @title, @due_at, @created_by)`,
    )
    .run(d);
  return Number(res.lastInsertRowid);
}

export function listUpcomingDeadlines(guildId: string): Deadline[] {
  return db
    .prepare(`SELECT * FROM deadlines WHERE guild_id = ? AND due_at > ? ORDER BY due_at ASC`)
    .all(guildId, Date.now()) as Deadline[];
}

export function deleteDeadline(guildId: string, id: number): boolean {
  return db.prepare(`DELETE FROM deadlines WHERE guild_id = ? AND id = ?`).run(guildId, id).changes > 0;
}

/** Deadline-urile care intră în fereastra de reminder și n-au primit încă reminderul respectiv. */
export function getDueReminders(kind: '24h' | '1h'): Deadline[] {
  const now = Date.now();
  const windowMs = kind === '24h' ? 24 * 3600_000 : 3600_000;
  const column = kind === '24h' ? 'reminded_24h' : 'reminded_1h';
  return db
    .prepare(`SELECT * FROM deadlines WHERE ${column} = 0 AND due_at > ? AND due_at <= ?`)
    .all(now, now + windowMs) as Deadline[];
}

export function markReminded(id: number, kind: '24h' | '1h'): void {
  const column = kind === '24h' ? 'reminded_24h' : 'reminded_1h';
  db.prepare(`UPDATE deadlines SET ${column} = 1 WHERE id = ?`).run(id);
}

// ---------- Sesiuni pomodoro (folosit de B) ----------
export function createSession(s: { guild_id: string; channel_id: string; started_by: string; duration_min: number }): number {
  const res = db
    .prepare(
      `INSERT INTO sessions (guild_id, channel_id, started_by, started_at, duration_min)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(s.guild_id, s.channel_id, s.started_by, Date.now(), s.duration_min);
  return Number(res.lastInsertRowid);
}

export function addParticipant(sessionId: number, userId: string): boolean {
  return (
    db.prepare(`INSERT OR IGNORE INTO session_participants (session_id, user_id) VALUES (?, ?)`).run(sessionId, userId)
      .changes > 0
  );
}

export function getParticipants(sessionId: number): string[] {
  return (
    db.prepare(`SELECT user_id FROM session_participants WHERE session_id = ?`).all(sessionId) as { user_id: string }[]
  ).map((r) => r.user_id);
}

export function finishSession(sessionId: number): void {
  db.prepare(`UPDATE sessions SET finished = 1 WHERE id = ?`).run(sessionId);
}
