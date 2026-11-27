import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { notImplemented } from '../utils.js';

// 👤 Persoana A
// TODO: împarte `optiuni` după virgulă (2-5 opțiuni), trimite un embed + un rând de ButtonBuilder.
//       Folosește message.createMessageComponentCollector() ca să numeri voturile (un vot per user)
//       și actualizează embed-ul cu bare de progres (ex: "████░░░░ 50%").
export const poll: Command = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Creează un sondaj rapid')
    .addStringOption((o) => o.setName('intrebare').setDescription('Întrebarea').setRequired(true))
    .addStringOption((o) => o.setName('optiuni').setDescription('Opțiuni separate prin virgulă').setRequired(true)),
  async execute(interaction) {
    await notImplemented(interaction, 'A');
  },
};
