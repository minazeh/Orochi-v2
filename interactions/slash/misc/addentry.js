/**
 * @file Sample help command with slash command.
 * @author 
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const paginationEmbed = require('discord.js-pagination');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'readingList.sqlite',
});

const readingList = sequelize.define('readingList', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title:  Sequelize.STRING,
	type:   Sequelize.STRING,
	status: Sequelize.STRING,
	latest: Sequelize.INTEGER,
	userID: Sequelize.STRING,
	rating: Sequelize.STRING,
	releaseDay: Sequelize.STRING,
	tags: Sequelize.STRING,
	url: Sequelize.STRING,
	
});


/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.
	
	data: new SlashCommandBuilder()
		.setName("readinglist")
		.setDescription( "Information about your personal reading list" )
		.addSubcommand(subcommand => 
			subcommand
				.setName('add')
				.setDescription('Add a new entry to your reading list')
				.addStringOption(option =>
					option.setName('title')
						.setDescription('Title')
						.setRequired(true))
				.addStringOption(option =>
					option.setName('type')
						.setDescription('Type')
						.setRequired(true)
						.addChoices(
							{ name: 'Manhwa / Manhua', value: 'Manhwa / Manhua' },
							{ name: 'Manga', value: 'Manga' },
							{ name: 'Light Novel', value: 'Light Novel' },
							{ name: 'Web Novel', value: 'Web Novel' },
						))
				.addStringOption(option =>
					option.setName('status')
						.setDescription('Status')
						.setRequired(true)
						.addChoices(
							{ name: 'To Read', value: 'To Read' },
							{ name: 'Reading', value: 'Reading' },
							{ name: 'Done', value: 'Done' },
							{ name: 'Dropped', value: 'Dropped' },
						))
				.addStringOption(option =>
					option.setName('rating')
						.setDescription('Rating')
						.setRequired(true)
						.addChoices(
							{ name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' },
							{ name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' },
							{ name: '⭐⭐⭐', value: '⭐⭐⭐' },
							{ name: '⭐⭐', value: '⭐⭐' },
							{ name: '⭐', value: '⭐' },
							{ name: 'No Rating', value: ' ' },
							
						))
				.addIntegerOption(option =>
					option.setName('latest')
						.setDescription('Latest Chapter Read')
						.setRequired(true))
				.addStringOption(option =>
					option.setName('release')
						.setDescription('Release Day')
						.setRequired(true)
						.addChoices(
							{ name: 'Monday', value: 'Monday' },
							{ name: 'Tuesday', value: 'Tuesday' },
							{ name: 'Wednesday', value: 'Wednesday' },
							{ name: 'Thursday', value: 'Thursday' },
							{ name: 'Friday', value: 'Friday' },
							{ name: 'Saturday', value: 'Saturday' },
							{ name: 'Sunday', value: 'Sunday' },
							{ name: 'Monthly', value: 'Monthly' },
							{ name: 'Irregular', value: 'Irregular' },
						))
				.addStringOption(option =>
					option.setName('tags')
						.setDescription('Genre (Separate by comma)')
						.setRequired(true))
				.addStringOption(option =>
					option.setName('url')
						.setDescription('URL')
						.setRequired(true))
		)
		.addSubcommand(subcommand => 
			subcommand
				.setName('view')
				.setDescription('Check your reading list')
				.addIntegerOption(option =>
					option.setName('itemid')
						.setDescription('View specific item')
						.setRequired(false))
		),

	async execute(interaction) {

		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'readinglist') {

			if (interaction.options.getSubcommand() === 'add') {

				async function addReadingList() {

					try {
					
						readingList.create({
							title:  interaction.options.getString('title'),
							type:   interaction.options.getString('type'),
							status: interaction.options.getString('status'),
							latest: interaction.options.getInteger('latest'),
							rating: interaction.options.getString('rating'),
							releaseDay: interaction.options.getString('release'),
							tags: interaction.options.getString('tags'),
							url: interaction.options.getString('url'),
							userID: interaction.member.id,
						});

						await interaction.reply({ content: interaction.options.getString('title') + ' has been added to your reading list!'});

					} catch (error) {
						console.log(error);
					}
				}

				addReadingList();

			} else if (interaction.options.getSubcommand() === 'view') {

				try { 

					const userReadingList = await readingList.findAll({ where: { userID: interaction.member.id } });	

						if(userReadingList.length != 0){

							pages = [];
							
							for( const list of userReadingList ){

								let readListID = '\n';
								let readListTitle= '\n';
								let readListRating = '\n';

								const embedReadingList = new EmbedBuilder()
								.setTitle( interaction.member.displayName + '\'s Reading List' )
								.setThumbnail( interaction.member.displayAvatarURL() )
								.setTimestamp()
								.setFooter({ text: 'Generated by ' + interaction.member.displayName, iconURL: 'https://i.imgur.com/RQiFqr7.gif' })
								.setColor('Random');
								
								readListID     += list.id + '\n';
								
								readListRating += list.rating + '\n';

								if( list.title.length > 42 ){

									// if title is more than 30 characters truncate it
									const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

									readListTitle  += truncate(list.title, 43, '... ')  + '\n';

								} else {

									readListTitle  += list.title + '\n';

								}
								

								embedReadingList.addFields({name: 'ID', value: readListID, inline: true});
								embedReadingList.addFields({name: 'Title', value: readListTitle, inline: true});
								embedReadingList.addFields({name: 'Rating', value: readListRating, inline: true});

								pages.push(embedReadingList);

							}

							

							//await interaction.reply({ content: 'Showing your reading list \n', embeds: [embedReadingList]});
							paginationEmbed(interaction.channel, pages);
							
							
						} else {

							await interaction.reply({ content: 'Reading list is empty, try adding some first.'});

						}

				} catch (error) {
					console.log(error);
				}

			} 


		}
		
		
	}

	
};
