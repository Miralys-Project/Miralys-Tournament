/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientEvents } from 'discord.js';
import { Instance } from './Instance.js';

export type RunEvent<ClientEvent extends keyof ClientEvents> = (
  client: Instance,
  ...eventArgs: ClientEvents[ClientEvent]
) => void;

export function runEvent<ClientEvent extends keyof ClientEvents>(
  _client: Instance,
  ..._eventArgs: ClientEvents[ClientEvent]
) {}

export class Event<ClientEvent extends keyof ClientEvents> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  public event: ClientEvent;
  public run: RunEvent<ClientEvent>;

  constructor(event: ClientEvent, runEvent: RunEvent<ClientEvent>) {
    this.event = event;
    this.run = runEvent;
  }
}
