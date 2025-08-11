import { ActivityType } from 'discord.js';
import { Event } from '../../structures/Event.js';
import { Logger } from '../../utils/Logger.js';

export default new Event('ready', async client => {
  client.user?.setStatus('online');
  client.user?.setActivity(`Miralys Tournament soon...`, {
    type: ActivityType.Streaming,
    url: 'https://www.twitch.tv/miralys',
  });

  Logger.info(
    `Client is logged in as ${client.user?.username} (${client.user?.id})`,
  );
});
