import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { config } from './config.js';
import { commands } from './commands/index.js';
import { startReminderJob } from './jobs/reminders.js';
import './db.js'; // creează tabelele la pornire

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const byName = new Map(commands.map((c) => [c.data.name, c]));

client.once(Events.ClientReady, (c) => {
  console.log(`🤖 Online ca ${c.user.tag}`);
  startReminderJob(c);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = byName.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Eroare în /${interaction.commandName}:`, err);
    const msg = { content: '❌ Ceva n-a mers. Încearcă din nou.', flags: MessageFlags.Ephemeral } as const;
    if (interaction.replied || interaction.deferred) await interaction.followUp(msg);
    else await interaction.reply(msg);
  }
});

await client.login(config.token);
