import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../structures/Command.js';
import i18next from 'i18next';
import {
  ApplicationIntegrationType,
  Colors,
  InteractionContextType,
  MessageFlags,
} from 'discord.js';

export default new Command({
  // @ts-expect-error Unknown error from D.JS
  data: new SlashCommandBuilder()
    .setName('lang')
    .setNameLocalizations({
      fr: 'langue',
      'en-GB': 'lang',
      'en-US': 'lang',
    })
    .setDescription('Replies with bot latencies')
    .setDescriptionLocalizations({
      fr: 'Configure la langue du bot pour le serveur',
      'en-GB': 'Config bot lang for the server',
      'en-US': 'Config bot lang for the server',
    })
    .setDefaultMemberPermissions(null)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setNSFW(false)
    .setContexts(InteractionContextType.Guild)
    .addStringOption(o =>
      o
        .setName('lang')
        .setNameLocalizations({
          fr: 'langue',
          'en-GB': 'lang',
          'en-US': 'lang',
        })
        .setDescription('The lang')
        .setDescriptionLocalizations({
          fr: 'La langue',
          'en-GB': 'The lang',
          'en-US': 'The lang',
        })
        .setRequired(true)
        .setAutocomplete(true),
    ),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autocomplete: async (client, interaction, _args) => {
    const focused = interaction.options.getFocused();
    const list = [
      { name: 'English', value: 'en' },
      { name: 'Français', value: 'fr' },
    ];

    const filtered = list.filter(lng => lng.name.startsWith(focused));

    await interaction.respond(filtered.map(choice => choice));
  },
  run: async (client, interaction, args, db) => {
    const chosenLang = args.getString('lang', true);

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const results = await db
      .promise()
      .query(`SELECT * FROM guilds WHERE guildID = ?`, [interaction.guildId]);

    const list = [
      { name: 'English', value: 'en' },
      { name: 'Français', value: 'fr' },
    ];

    const title = i18next.t('lang-title', { lng: chosenLang });
    const desc = i18next.t('lang-desc', {
      lng: chosenLang,
      lang: `\`${list.filter(l => l.value === chosenLang)[0].name}\``,
    });

    if (results.length < 1) {
      db.query(`INSERT INTO guilds (guildID, lang) VALUES (?,?)`, [
        interaction.guildId,
        chosenLang,
      ]);
    } else {
      db.query(`UPDATE guilds SET lang = ? WHERE guildID = ?`, [
        chosenLang,
        interaction.guildId,
      ]);
    }

    const mainEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setTitle(title)
      .setDescription(desc)
      .setThumbnail(client.user?.displayAvatarURL() || '')
      .setTimestamp()
      .setFooter({
        text: client.user?.username || '',
        iconURL: client.user?.displayAvatarURL(),
      });

    interaction.editReply({ embeds: [mainEmbed] });
  },
});
