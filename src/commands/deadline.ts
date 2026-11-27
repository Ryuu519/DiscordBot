import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { notImplemented } from '../utils.js';

// 👤 Persoana A
// TODO:
//  - add: parsează `data` ("YYYY-MM-DD HH:mm") -> timestamp ms, validează că e în viitor,
//         salvează cu addDeadline() (channel_id = interaction.channelId), răspunde cu un embed.
//  - list: listUpcomingDeadlines() -> embed cu câte un field per deadline (<t:unix:R> pentru "în 3 zile").
//  - delete: deleteDeadline() după id.
export const deadline: Command = {
  data: new SlashCommandBuilder()
    .setName('deadline')
    .setDescription('Gestionează deadline-urile')
    .addSubcommand((s) =>
      s
        .setName('add')
        .setDescription('Adaugă un deadline')
        .addStringOption((o) => o.setName('materie').setDescription('Ex: POO').setRequired(true))
        .addStringOption((o) => o.setName('titlu').setDescription('Ex: Tema 2').setRequired(true))
        .addStringOption((o) => o.setName('data').setDescription('Format: YYYY-MM-DD HH:mm').setRequired(true)),
    )
    .addSubcommand((s) => s.setName('list').setDescription('Deadline-urile care urmează'))
    .addSubcommand((s) =>
      s
        .setName('delete')
        .setDescription('Șterge un deadline')
        .addIntegerOption((o) => o.setName('id').setDescription('ID-ul din /deadline list').setRequired(true)),
    ),
  async execute(interaction) {
    await notImplemented(interaction, 'A');
  },
};
