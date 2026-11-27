import cron from 'node-cron';
import type { Client } from 'discord.js';

// 👤 Persoana A
// Rulează în fiecare minut. TODO:
//  - pentru kind în ['24h', '1h']: getDueReminders(kind)
//  - pentru fiecare deadline: client.channels.fetch(channel_id), trimite embed
//    "⏰ POO: Tema 2 expiră <t:unix:R>", apoi markReminded(id, kind)
//  - try/catch per deadline, ca un canal șters să nu blocheze restul
export function startReminderJob(client: Client): void {
  cron.schedule('* * * * *', async () => {
    void client; // scoate linia asta când implementezi
  });
  console.log('⏰ Job-ul de remindere a pornit');
}
