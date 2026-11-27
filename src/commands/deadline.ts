import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types.js';
import { addDeadline } from '../db.js';
import { listUpcomingDeadlines } from '../db.js';
import { deleteDeadline } from '../db.js';

export const deadline: Command = {
  data: new SlashCommandBuilder()
    .setName('deadline')
    .setDescription('Manage deadlines')
    .addSubcommand((s) =>
      s
        .setName('add')
        .setDescription('Add a deadline')
        .addStringOption((o) => o.setName('subject').setDescription('Ex: OOP').setRequired(true))
        .addStringOption((o) => o.setName('title').setDescription('Ex: Lab 2').setRequired(true))
        .addStringOption((o) => o.setName('date').setDescription('Format: YYYY-MM-DD HH:mm').setRequired(true)),
    )
    .addSubcommand((s) => s.setName('list').setDescription('Next deadlines'))
    .addSubcommand((s) =>
      s
        .setName('delete')
        .setDescription('Delete a deadline')
        .addIntegerOption((o) => o.setName('id').setDescription('The ID from /deadline list').setRequired(true)),
    ),
  async execute(interaction) {
      const subcommand = interaction.options.getSubcommand()

      const guild_id = interaction.guildId
      if (guild_id === null) {
        await interaction.reply("You need to be in a server")
        return
      }

      if (subcommand === "add") {
        const subject = interaction.options.getString("subject", true)
        const title = interaction.options.getString("title", true)
        const date = Date.parse(interaction.options.getString("date", true))
        if (Number.isNaN(date)) {
          await interaction.reply("Date format should be YYYY-MM-DD HH:mm, anything else is invalid")
          return
        } 
        if (date < Date.now()) {
          await interaction.reply("Date is in the past")
          return 
        }

        const id = addDeadline({ 
                      guild_id: guild_id, 
                      channel_id: interaction.channelId, 
                      subject: subject, 
                      title: title, 
                      due_at: date, 
                      created_by: interaction.user.id
                    })
        await interaction.reply(`Saved deadline with id #${id}: ${subject} - ${title} - <t:${Math.round(date/1000)}:R>`)
        return

      }

      else if (subcommand === "list") {

        const list = listUpcomingDeadlines(guild_id)
        if (list.length === 0) {
          await interaction.reply("No upcoming deadlines!")
          return
        }

        const deadlines: string[] = []
        for (const elem of list) {
          deadlines.push(`#${elem.id}: ${elem.subject} - ${elem.title} - <t:${Math.round(elem.due_at/1000)}:R>`)
        }

        await interaction.reply("Upcoming deadlines:\n" + deadlines.join("\n"))
        return
        
      }
      else if (subcommand === "delete"){

        const deleteId = interaction.options.getInteger("id", true)
        const deleted = deleteDeadline(guild_id, deleteId)
        if (deleted) {
          await interaction.reply(`Deleted deadline with id #${deleteId}`)
          return 
        }
        else {
          await interaction.reply(`There's no deadline with id #${deleteId}`)
          return
        }

      }
      else {
        await interaction.reply("Invalid interaction")
        return
      }
  },
};

