# 📚 StudyBot

Bot de Discord pentru serverele de facultate: deadline-uri cu remindere automate, asistent AI, sesiuni de studiu de grup (pomodoro) cu XP și leaderboard.

> 🎬 _Aici puneți GIF-uri / screenshot-uri cu fiecare comandă la final._
> 🔗 _Link de invitare: (completați după deploy)_

---

## ✨ Funcționalități

| Comandă | Ce face |
|---|---|
| `/deadline add` / `list` / `delete` | Deadline-uri pe materii, cu remindere automate cu **24h** și **1h** înainte |
| `/ask` | Întrebări către asistentul AI (Claude API), cu răspunsul afișat într-un embed |
| `/pomodoro` | Sesiune de studiu de grup cu timer; participanții primesc XP |
| `/leaderboard` | Top 10 cei mai harnici studenți |
| `/poll` | Sondaj rapid cu butoane |
| `/help`, `/ping` | Lista comenzilor / starea botului |

## 🛠️ Stack

- **Node.js 20+** + **TypeScript**
- **discord.js v14**: slash commands, embed-uri, butoane
- **SQLite** (better-sqlite3): bază de date locală, fără setup
- **node-cron**: job-ul de remindere
- **Anthropic SDK**: Claude (`claude-haiku-5-5`) pentru `/ask`
- **Deploy:** Railway sau Fly.io

## 📁 Structura proiectului

```
src/
├── index.ts             # pornește botul, rutează comenzile
├── deploy-commands.ts   # înregistrează slash commands la Discord
├── config.ts            # citește .env
├── db.ts                # schema SQLite + funcții helper (contractul A ↔ B)
├── types.ts             # interfața Command
├── utils.ts             # culori, embed de bază, helpere
├── commands/
│   ├── index.ts         # lista tuturor comenzilor
│   ├── ping.ts          # ✅ gata
│   ├── help.ts          # ✅ gata (de înfrumusețat)
│   ├── deadline.ts      # 👤 A
│   ├── poll.ts          # 👤 A
│   ├── ask.ts           # 👤 B
│   ├── pomodoro.ts      # 👤 B
│   └── leaderboard.ts   # 👤 B
└── jobs/
    └── reminders.ts     # 👤 A
```

## 🚀 Setup

1. **Creați botul:** [discord.com/developers/applications](https://discord.com/developers/applications) → _New Application_ → tab-ul **Bot** → _Reset Token_ (copiați-l).
2. **Invitați-l pe serverul de test:** _OAuth2 → URL Generator_ → bifați `bot` + `applications.commands`, plus permisiunile `Send Messages` și `Embed Links` → deschideți link-ul generat.
3. **Configurați proiectul:**
   ```bash
   npm install
   cp .env.example .env   # și completați valorile
   ```
4. **Înregistrați comenzile** (rulați din nou de fiecare dată când schimbați numele sau opțiunile unei comenzi):
   ```bash
   npm run deploy
   ```
5. **Porniți botul** (cu reload automat):
   ```bash
   npm run dev
   ```
6. Scrieți `/ping` pe server. Dacă primiți 🏓, totul merge.

| Script | Ce face |
|---|---|
| `npm run dev` | Pornește botul cu reload automat |
| `npm run deploy` | Înregistrează slash commands |
| `npm run typecheck` | Verifică tipurile |
| `npm run build` / `npm start` | Build pentru producție / rulare |

> ⚠️ `.env` **nu** se urcă pe GitHub (e deja în `.gitignore`). Dacă token-ul ajunge public, dați imediat _Reset Token_.

---

## 👥 Împărțirea taskurilor

| | **Persoana A: Core și infrastructură** | **Persoana B: Funcționalități și prezentare** |
|---|---|---|
| Setup | Repo pe GitHub, verificarea scheletului | Aplicația în Developer Portal, serverul de test, invitarea botului |
| Bază de date | Deține `db.ts` (schema + helpere) | Folosește helper-ele din `db.ts` |
| Funcționalități | `/deadline` + remindere cu cron, `/poll` | `/ask` (AI), `/pomodoro` + XP, `/leaderboard` |
| Final | Deploy, variabile de mediu, logging și erori | README cu GIF-uri, embed-uri arătoase, `/help`, demo |

### Reguli ca să nu aveți conflicte
- **Fiecare comandă stă în fișierul ei.** Toate sunt deja înregistrate în `commands/index.ts`, deci nu trebuie să-l modificați.
- **Branch-uri separate** (`feat/deadline`, `feat/ask` etc.); faceți merge des în `main`, cel puțin la fiecare checkpoint.
- **`db.ts` e contractul comun:** dacă schimbați schema, anunțați-vă. Ștergeți `studybot.db` după orice schimbare de schemă.
- Fiecare fișier are în comentariul `TODO` pașii de implementare.

---

## ⏱️ Planul zilei

| Interval | Persoana A | Persoana B |
|---|---|---|
| **09:00–10:00** | Repo pe GitHub, `npm install`, citit schema din `db.ts` | Botul în portal, serverul de test, `.env` |
| ✅ _Checkpoint_ | _Botul e online și răspunde la `/ping` la amândoi_ | |
| **10:00–13:00** | `/deadline add/list/delete` | `/ask` cu Claude API |
| **13:00–13:30** | 🍕 Pauză + merge în `main` | |
| **13:30–16:30** | Job-ul de remindere + `/poll` cu butoane | `/pomodoro` (timer, buton Join, XP) + `/leaderboard` |
| **16:30–18:00** | Deploy pe Railway (botul rulează 24/7), tratarea erorilor | Polish vizual (culori, iconițe, footer-e), `/help` |
| **18:00–19:00** | 🧪 Testați totul împreună pe un server real, reparați bug-uri, scrieți README-ul final cu GIF-uri | |

**Opțional, dacă rămâne timp:** un dashboard web cu leaderboard-ul (Next.js care citește aceeași bază de date).

---

## ✅ Checklist înainte de start

- [ ] Amândoi aveți **Node 20+** (`node -v`)
- [ ] Botul e creat în Developer Portal și token-ul e în `.env`
- [ ] Botul e invitat pe serverul de test, iar `DISCORD_GUILD_ID` e setat
- [ ] Aveți o cheie Claude API ([console.anthropic.com](https://console.anthropic.com)) în `ANTHROPIC_API_KEY`
- [ ] Repo-ul e pe GitHub și amândoi aveți acces

## ✅ Checklist pentru final

- [ ] Toate comenzile merg pe serverul de test
- [ ] Botul e deployat și rulează fără laptop
- [ ] README cu GIF-uri pentru fiecare comandă + link de invitare
- [ ] Repo public, fără secrete în istoricul git

---

## 💼 Pentru CV

> **StudyBot**: Bot de Discord în TypeScript, cu asistent AI (Claude API), remindere programate și gamification (XP + leaderboard). Folosit de X studenți, deploy pe Railway.
> _Tehnologii: TypeScript, discord.js, SQLite, node-cron, Anthropic API_
