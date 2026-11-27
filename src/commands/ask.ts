import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { notImplemented } from '../utils.js';

// 👤 Persoana B
// TODO:
//  - interaction.deferReply() (AI-ul durează > 3 secunde, altfel Discord dă timeout)
//  - apel la Claude cu @anthropic-ai/sdk, model "claude-haiku-5-5", cheia din config.anthropicKey
//  - system prompt: asistent de studiu, răspunsuri scurte, în română, cu exemple
//  - embed-ul are maxim 4096 caractere în descriere: limitează max_tokens și taie răspunsul la nevoie
//  - interaction.editReply({ embeds: [...] }); la eroare, mesaj prietenos
export const ask: Command = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Pune o întrebare asistentului AI')
    .addStringOption((o) => o.setName('intrebare').setDescription('Ce vrei să afli?').setRequired(true)),
  async execute(interaction) {
    await notImplemented(interaction, 'B');
  },
};
