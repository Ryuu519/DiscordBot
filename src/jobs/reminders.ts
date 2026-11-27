import cron from 'node-cron';
import type { Client } from 'discord.js';
import { getDueReminders, markReminded } from '../db.js';

export function startReminderJob(client: Client): void {
  cron.schedule('* * * * *', async () => {
    for (const kind of ['24h', '1h'] as const) {
      const reminders = getDueReminders(kind)
      for (const reminder of reminders) {
        try {
          const channel = await client.channels.fetch(reminder.channel_id)
          if (channel !== null && channel.isSendable()) {
            await channel.send(`Reminder: ${reminder.subject} - ${reminder.title} is due <t:${Math.round(reminder.due_at/1000)}:R>`)
          }
        }
        catch (err) {
          console.error(`Reminder #${reminder.id} failed:`, err)
        }
        markReminded(reminder.id, kind)
      }
    }
    
  });
  console.log('Reminder job has started');
}
