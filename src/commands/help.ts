import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { baseEmbed } from '../utils.js';

// 👤 Persoana B: fă-l frumos la polish (iconițe, exemple de folosire).
export const help: Command = {
  data: new SlashCommandBuilder().setName('help').setDescription('Lista comenzilor'),
  async execute(interaction) {
    const embed = baseEmbed()
      .setTitle('📚 StudyBot: comenzi')
      .addFields(
        { name: '/deadline add | list | delete', value: 'Deadline-uri cu remindere automate' },
        { name: '/ask', value: 'Întreabă asistentul AI' },
        { name: '/pomodoro', value: 'Sesiune de studiu de grup (+XP)' },
        { name: '/leaderboard', value: 'Clasamentul XP' },
        { name: '/poll', value: 'Sondaj rapid' },
        { name: '/ping', value: 'Verifică dacă botul e online' },
      );
    await interaction.reply({ embeds: [embed] });
  },
};
