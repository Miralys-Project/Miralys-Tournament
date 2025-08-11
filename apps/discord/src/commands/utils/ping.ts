import {
  ApplicationIntegrationType,
  Colors,
  InteractionContextType,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../structures/Command.js';
import i18next from 'i18next';
import { EmbedBuilder } from '@discordjs/builders';

interface guildDatas {
  lang: string;
  guildID: string;
}

export default new Command({
  data: new SlashCommandBuilder()
    .setName('ping')
    .setNameLocalizations({
      fr: 'latence',
      'en-GB': 'ping',
      'en-US': 'ping',
    })
    .setDescription('Replies with bot latencies')
    .setDescriptionLocalizations({
      fr: 'Affiche les latences du bot',
      'en-GB': 'Replies with bot latencies',
      'en-US': 'Replies with bot latencies',
    })
    .setDefaultMemberPermissions(null)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setNSFW(false)
    .setContexts(InteractionContextType.Guild),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autocomplete: (_client, _interaction, _db) => {},
  run: async (client, interaction, _args, db) => {
    const pingws = client.ws.ping;

    const startBot = Date.now();
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const endBot = Date.now();

    const startDB = Date.now();
    db.query(
      `SELECT * FROM guilds WHERE guildID = ?`,
      [interaction.guildId],
      async (err, results) => {
        const endDB = Date.now();
        if (err) {
          console.error(err);
          return interaction.editReply(
            'An error occurred while retrieving data.',
          );
        }
        const guildData: guildDatas = (
          results as guildDatas[]
        )[0] as guildDatas;
        if (!guildData) {
          return interaction.editReply('No guild data found.');
        }

        const pingdb = endDB - startDB;
        const ping = i18next
          .t('ping', {
            lng: guildData.lang as string,
            pingbot: endBot - startBot,
            pingws,
            pingdb,
          })
          .split(';');
        const title = i18next.t('ping-title', { lng: guildData.lang });

        const mainEmbed = new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle(title)
          .setDescription(ping.join('\n'))
          .setThumbnail(client.user?.displayAvatarURL() || '')
          .setTimestamp()
          .setFooter({
            text: client.user?.username || '',
            iconURL: client.user?.displayAvatarURL(),
          });

        await interaction.editReply({ embeds: [mainEmbed] });
      },
    );
  },
});
