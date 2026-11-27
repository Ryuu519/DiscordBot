import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { notImplemented } from '../utils.js';

// 👤 Persoana B
// TODO: getTopUsers(10) -> embed cu 🥇🥈🥉 pentru primii 3, apoi `#4`, `#5`...
//       Menționează userii cu <@id> ca să apară numele lor.
export const leaderboard: Command = {
  data: new SlashCommandBuilder().setName('leaderboard').setDescription('Top 10 cei mai harnici studenți'),
  async execute(interaction) {
    await notImplemented(interaction, 'B');
  },
};
