import { Routes } from 'discord.js';
import { Instance } from './Instance.js';
import { Logger } from '../utils/Logger.js';

export function loadSlashCommand(client: Instance) {
  client.commands.forEach(command => {
    client.slashcommands.push(command.data);
  });

  client.rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
    body: client.slashcommands,
  });
  Logger.slashcommand(`Loaded ${client.slashcommands.length} slash commands`);
}
