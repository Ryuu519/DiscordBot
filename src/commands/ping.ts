import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';

export const ping: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Verifică dacă botul e online'),
  async execute(interaction) {
    await interaction.reply(`🏓 Pong! Latență: ${interaction.client.ws.ping}ms`);
  },
};
