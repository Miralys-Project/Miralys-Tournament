import { Event } from '../../structures/Event.js';

interface guildDatas {
  lang: string;
  guildID: string;
}

export default new Event('interactionCreate', async (client, interaction) => {
  if (interaction.isCommand()) {
    if (interaction.channel?.isDMBased()) {
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '❌ Commands are not available in DMs.',
          ephemeral: true,
        });
      }
      return;
    }

    if (!interaction.guildId) return;

    try {
      const results = await client.db
        .promise()
        .query(`SELECT * FROM guilds WHERE guildID = ?`, [interaction.guildId]);
      const guildData = results[0] as guildDatas[];

      if (!guildData.length) {
        await client.db
          .promise()
          .query(`INSERT INTO guilds (guildID, lang) VALUES (?, ?)`, [
            interaction.guildId,
            'en',
          ]);
      }

      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      // @ts-expect-error There is no correct type for interaction.options
      await command.run(client, interaction, interaction.options, client.db);
    } catch (error) {
      console.error(error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'An error occurred while processing the command.',
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isAutocomplete()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    command?.autocomplete(client, interaction, client.db);
  }
});
