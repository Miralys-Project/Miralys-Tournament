import { Event } from '../../structures/Event.js';

interface guildDatas {
  lang: string;
  guildID: string;
}

export default new Event('guildDelete', async (client, guild) => {
  const results = await client.db
    .promise()
    .query(`SELECT * FROM guilds WHERE guildID = ?`, [guild.id]);
  const guildData = results[0] as guildDatas[];

  if (guildData.length >= 1) {
    await client.db
      .promise()
      .query(`DELETE FROM guilds WHERE guildID = ?`, [guild.id]);
  }
});
