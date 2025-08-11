import { Collection } from '@discordjs/collection';
import {
  Client,
  ClientEvents,
  Partials,
  REST,
  SlashCommandBuilder,
} from 'discord.js';
import { Connection } from 'mysql2';
import { Database } from '../utils/Database.js';
import { emojis } from '../utils/emojis.js';
import path from 'node:path';
import { promises } from 'node:fs';
import { Logger } from '../utils/Logger.js';
import { Command } from './Command.js';
import { Event } from './Event.js';
import { loadSlashCommand } from './loadSlashcommand.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Instance extends Client {
  public rest: REST;
  public commands: Collection<string, Command>;
  public version = '1.0.0';
  public db: Connection;
  public slashcommands: Array<SlashCommandBuilder>;
  public personalemojis: typeof emojis;

  constructor() {
    super({
      intents: 3276799,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.User,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.SoundboardSound,
      ],
    });

    this.rest = new REST({ version: '10' }).setToken(
      process.env.TOKEN as string,
    );
    this.commands = new Collection();
    this.slashcommands = new Array<SlashCommandBuilder>();
    this.db = Database;
    this.personalemojis = emojis;
  }
  async loadCommands() {
    const commandDirs = await promises.readdir(
      path.join(__dirname, '../commands/'),
    );
    for (const dir of commandDirs) {
      const commandFiles = await promises.readdir(
        path.join(__dirname, '../commands/', dir),
      );
      for (const file of commandFiles) {
        if (file.endsWith('.js')) {
          const command: Command = await import(`../commands/${dir}/${file}`);
          this.commands.set(command.default.data.name, command.default);
          Logger.command(`Loaded command ${command.default.data.name}`);
        }
      }
    }
  }
  async loadEvents() {
    const eventDirs = await promises.readdir(
      path.join(__dirname, '../events/'),
    );
    for (const dir of eventDirs) {
      const eventFiles = await promises.readdir(
        path.join(__dirname, '../events/', dir),
      );
      for (const file of eventFiles) {
        if (file.endsWith('.js')) {
          const event: Event<keyof ClientEvents> = await import(
            `../events/${dir}/${file}`
          );
          this.on(event.default.event, (...args) =>
            event.default.run(this, ...args),
          );
          Logger.event(`Loaded event ${event.default.event}`);
        }
      }
    }
  }
  async start() {
    await this.loadCommands();
    await this.loadEvents();
    loadSlashCommand(this);

    await this.login(process.env.TOKEN);
  }
}
