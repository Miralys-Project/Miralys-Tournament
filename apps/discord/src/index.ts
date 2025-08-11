import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Logger } from './utils/Logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '../.env') });

const manager = new ShardingManager(path.resolve(__dirname + '/client.js'), {
  totalShards: 'auto',
  token: process.env.TOKEN,
});

manager.on('shardCreate', shard => {
  Logger.shards(`Launching shard ${shard.id}`);
});

manager.spawn();
