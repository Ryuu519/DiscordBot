import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Lipsește ${name} din .env (vezi .env.example)`);
  return value;
}

export const config = {
  token: required('DISCORD_TOKEN'),
  clientId: required('DISCORD_CLIENT_ID'),
  guildId: process.env.DISCORD_GUILD_ID || undefined,
  anthropicKey: process.env.ANTHROPIC_API_KEY || undefined,
  dbPath: process.env.DB_PATH || 'studybot.db',
};
