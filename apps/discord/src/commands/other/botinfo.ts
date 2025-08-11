import {
  ApplicationIntegrationType,
  ButtonStyle,
  Colors,
  InteractionContextType,
  MessageFlags,
  ShardClientUtil,
} from 'discord.js';
import { Command } from '../../structures/Command.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from '@discordjs/builders';
import i18next from 'i18next';

interface guildDatas {
  lang: string;
  guildID: string;
}

export default new Command({
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Get information about the bot.')
    .setNameLocalizations({
      'en-US': 'botinfo',
      'en-GB': 'botinfo',
      fr: 'info-bot',
    })
    .setDescriptionLocalizations({
      fr: 'Affiche des informations sur le bot.',
      'en-GB': 'Get information about the bot.',
      'en-US': 'Get information about the bot.',
    })
    .setDefaultMemberPermissions(null)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setNSFW(false)
    .setContexts(InteractionContextType.Guild),

  autocomplete: () => {},
  run: async (client, interaction, _args, db) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const totalGuildsArray = await (
      client.shard as ShardClientUtil
    ).broadcastEval(client => client.guilds.cache.size);
    const totalGuilds = totalGuildsArray.reduce(
      (acc, guildCount) => acc + guildCount,
      0,
    );

    // Récupérer le total des utilisateurs sur tous les shards
    const totalUsersArray = await (
      client.shard as ShardClientUtil
    ).broadcastEval(client => client.users.cache.size);
    const totalUsers = totalUsersArray.reduce(
      (acc, userCount) => acc + userCount,
      0,
    );

    const guild = await db
      .promise()
      .query(`SELECT * FROM guilds WHERE guildID = ?`, [interaction.guildId]);

    const lang =
      guild.length < 1 ? 'en' : (guild[0] as unknown as guildDatas).lang;

    const mainEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setThumbnail(client.user?.displayAvatarURL() || '')
      .setTimestamp()
      .setFooter({
        text: client.user?.username || '',
        iconURL: client.user?.displayAvatarURL(),
      });

    const title = i18next.t('botinfo-title', { lng: lang });
    const name = i18next.t('botinfo-name', { lng: lang });
    const id = i18next.t('botinfo-id', { lng: lang });
    const users = i18next.t('botinfo-users', { lng: lang });
    const servers = i18next.t('botinfo-servers', { lng: lang });
    const version = i18next.t('botinfo-version', { lng: lang });
    const language = i18next.t('botinfo-language', { lng: lang });
    const creator = i18next.t('botinfo-creator', { lng: lang });

    const website = i18next.t('website', { lng: lang });

    mainEmbed
      .setTitle(title)
      .addFields(
        { name: name, value: `\`${client.user?.username}\``, inline: true },
        { name: id, value: `\`${client.user?.id}\``, inline: true },
        { name: users, value: `\`${totalUsers}\``, inline: true },
        { name: servers, value: `\`${totalGuilds}\``, inline: true },
        { name: version, value: `\`${client.version}\``, inline: true },
        { name: language, value: `\`TypeScript\``, inline: true },
        {
          name: creator,
          value: '[Miralys Project](https://github.com/Miralys-Project)',
          inline: true,
        },
      );

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('GitHub')
        .setStyle(ButtonStyle.Link)
        .setEmoji({ name: '💾' })
        .setURL('https://github.com/Miralys-Project/Miralys-Tournament'),

      new ButtonBuilder()
        .setLabel(website)
        .setStyle(ButtonStyle.Link)
        .setEmoji({ name: '🌐' })
        .setURL('https://miralys.xyz'),

      new ButtonBuilder()
        .setLabel('Discord')
        .setStyle(ButtonStyle.Link)
        .setEmoji({ name: '💾' })
        .setURL('https://discord.gg/pxkN36Yd2c'),
    );

    interaction.editReply({ embeds: [mainEmbed], components: [buttons] });
  },
});
