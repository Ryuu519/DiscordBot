import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { notImplemented } from '../utils.js';

// 👤 Persoana B
// TODO:
//  - createSession(), apoi un embed cu timer (<t:unix:R>) și un buton "Join 📚"
//  - la click: addParticipant(); actualizează lista de participanți din embed
//  - setTimeout(minute): finishSession(), addXp(user, minute) pentru fiecare participant,
//    mesaj final "Sesiune terminată! +25 XP pentru @a, @b"
export const pomodoro: Command = {
  data: new SlashCommandBuilder()
    .setName('pomodoro')
    .setDescription('Pornește o sesiune de studiu de grup')
    .addIntegerOption((o) =>
      o.setName('minute').setDescription('Durata (implicit 25)').setMinValue(1).setMaxValue(120),
    ),
  async execute(interaction) {
    await notImplemented(interaction, 'B');
  },
};
