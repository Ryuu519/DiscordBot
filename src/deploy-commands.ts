import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { commands } from './commands/index.js';

// Rulează `npm run deploy` de fiecare dată când adaugi sau modifici o comandă (nume, opțiuni).
const rest = new REST().setToken(config.token);
const body = commands.map((c) => c.data.toJSON());

const route = config.guildId
  ? Routes.applicationGuildCommands(config.clientId, config.guildId) // instant, doar pe serverul de test
  : Routes.applicationCommands(config.clientId); // global, poate dura până la 1h

await rest.put(route, { body });
console.log(`✅ ${body.length} comenzi înregistrate ${config.guildId ? 'pe serverul de test' : 'global'}`);
