import {
  AutocompleteInteraction,
  CommandInteraction,
  CommandInteractionOptionResolver,
  SlashCommandBuilder,
} from 'discord.js';
import { Instance } from './Instance.js';
import { Connection } from 'mysql2';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function run(
  _client: Instance,
  _interaction: CommandInteraction,
  _args: CommandInteractionOptionResolver,
  _db: Connection,
) {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function runautocomplete(
  _client: Instance,
  _interaction: AutocompleteInteraction,
  _db: Connection,
) {}

interface CommandOptions {
  data: SlashCommandBuilder;
  run: typeof run;
  autocomplete: typeof runautocomplete;
}

export class Command {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  public data: SlashCommandBuilder;
  public run: typeof run;
  public autocomplete: typeof runautocomplete;

  constructor(options: CommandOptions) {
    this.data = options.data;
    this.run = options.run;
    this.autocomplete = options.autocomplete;
  }
}
