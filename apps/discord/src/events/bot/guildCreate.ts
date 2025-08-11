import { Event } from '../../structures/Event.js';

interface guildDatas {
  lang: string;
  guildID: string;
}

export default new Event('guildCreate', async (client, guild) => {
  const results = await client.db
    .promise()
    .query(`SELECT * FROM guilds WHERE guildID = ?`, [guild.id]);
  const guildData = results[0] as guildDatas[];

  if (!guildData.length) {
    await client.db
      .promise()
      .query(`INSERT INTO guilds (guildID, lang) VALUES (?, ?)`, [
        guild.id,
        'en',
      ]);
  }
});
