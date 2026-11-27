import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags } from 'discord.js';

/** Culorile botului, ca toate embed-urile să arate la fel. */
export const COLORS = {
  primary: 0x5865f2,
  success: 0x57f287,
  warning: 0xfee75c,
  danger: 0xed4245,
} as const;

export function baseEmbed(): EmbedBuilder {
  return new EmbedBuilder().setColor(COLORS.primary).setFooter({ text: 'StudyBot' }).setTimestamp();
}

/** Răspuns temporar pentru comenzile încă neimplementate. */
export async function notImplemented(interaction: ChatInputCommandInteraction, owner: 'A' | 'B'): Promise<void> {
  await interaction.reply({
    content: `🚧 \`/${interaction.commandName}\` e încă în lucru (responsabil: persoana ${owner}).`,
    flags: MessageFlags.Ephemeral,
  });
}
