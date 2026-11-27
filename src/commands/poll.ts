import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { ButtonBuilder } from 'discord.js';
import { ButtonStyle } from 'discord.js';
import { ActionRowBuilder } from 'discord.js';
import { ComponentType } from 'discord.js';
import { MessageFlags } from 'discord.js';

export const poll: Command = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a quick poll')
    .addStringOption((o) => o.setName('question').setDescription('The question').setRequired(true))
    .addStringOption((o) => o.setName('options').setDescription('Options, separated by commas').setRequired(true)),
  async execute(interaction) {
    const question = interaction.options.getString("question", true)
    const options = interaction.options.getString("options", true)
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s !== "")
    
    if (options.length < 2 || options.length > 5) {
      await interaction.reply("The number of options should be between 2 - 5")
      return
    }

    const buttons = options.map((s, i) => 
                    new ButtonBuilder()
                    .setCustomId(i.toString())
                    .setLabel(s)
                    .setStyle(ButtonStyle.Primary))
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)
    await interaction.reply({content: question, components: [row]})

    const votes = new Map<string, number>()
    let resultText = question
    const message = await interaction.fetchReply()
    const collector = message.createMessageComponentCollector({componentType: ComponentType.Button, time: 600000})
  
    collector.on('collect', async (click) => {
      const choice = Number(click.customId)
      votes.set(click.user.id, choice)
      await click.reply({content: `You voted for ${options[choice]}`, flags: MessageFlags.Ephemeral})
    
      const total = votes.size
      const lines = options.map((option, i) => {
        const count = [...votes.values()].filter((x) => x === i).length
        const percent = Math.round(count / total * 100)
        const filled = Math.round(percent / 10)
        const bar = "█".repeat(filled) + "░".repeat(10 - filled)
        return `${option}  ${bar} ${percent}% (${count})`
      }) 
      resultText = `${question}\n${lines.join("\n")}`
      await interaction.editReply({content: resultText})     
    })
    collector.on('end', async () => {
      await interaction.editReply({components: [], content: `${resultText}\nPoll has closed`})
    })
  },
};
