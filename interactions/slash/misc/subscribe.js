/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits  } = require("discord.js");
const Sequelize = require('sequelize');
const moment = require('moment');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'subscription.sqlite',
});

const subscribe = sequelize.define('subscription', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: Sequelize.STRING,
    dateSubscribed: Sequelize.DATE,
    dateExpired: Sequelize.DATE,
    addedBy: Sequelize.STRING,
    
});

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("subscribe")
		.setDescription(
			"Commands for subscribers [Admin & Moderator Limited Commands]"
		)
        .addSubcommand(subcommand => 
			subcommand
				.setName('add')
				.setDescription('Add a new subscriber')
				.addStringOption(option =>
					option.setName('id')
						.setDescription('User ID')
						.setRequired(true))
				.addIntegerOption(option =>
					option.setName('type')
						.setDescription('Type')
						.setRequired(true)
						.addChoices(
							{ name: 'Monthly', value: 30 },
							{ name: 'Trial - 3 Days', value: 3 },
							{ name: 'Trial - 1 Day', value: 1 },
						))
				.addStringOption(option =>
					option.setName('server')
						.setDescription('Server')
						.setRequired(true)
						.addChoices(
							{ name: 'Eternal Love', value: 'EL' },
							{ name: 'Midnight Party', value: 'MP' },
							{ name: 'Memory of Faith', value: 'MOF' },
							{ name: 'Valhalla Glory', value: 'VG' },
						))
		),

	async execute(interaction) {

        if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'subscribe') {

			if (interaction.options.getSubcommand() === 'add') {

				async function addSubscriber() {

					try {

                        const client = new Client({
                        intents: [
                            GatewayIntentBits.Guilds,
                            GatewayIntentBits.GuildMessages,
                            GatewayIntentBits.GuildMembers
                        ]
                        });
					
						let guild = client.guilds.cache.get(interaction.guild.id);
                        
                        if( guild.member.fetch(interaction.options.getString('id'))){

                            const user = client.users.cache.get(interaction.options.getString('id'));

                            // let dateNow = Math.floor(new Date().getTime() / 1000);
                            let dateNow = moment();
                            let dateExpiration = moment().add(interaction.options.getInteger('type'), 'days');
                            let difference = dateExpiration.diff(dateNow, 'seconds');
                            let epochDateNow = moment().unix() + difference;
                            

                            const newSubscriber = new EmbedBuilder()
                                .setTitle( 'New Subscription')
                                .setThumbnail( user.avatarURL() )
                                .setDescription('You have added a new subscriber')
                                .setColor('Green')
                                .addFields({name: 'Display Name', value: user.username})
                                .addFields({name: 'User ID', value: user.id})
                                .addFields({name: 'Duration', value: '<t:'+ epochDateNow +':R>'})


                            subscribe.create({
                                userID: user.id,
                                dateSubscribed: dateNow,
                                dateExpired: dateExpiration,
                                addedBy: interaction.author.username

                            }); 
                            
                            
                            await interaction.reply({ embeds:[newSubscriber], ephemeral: true });

                        }

					} catch (error) {
						console.log(error);
					}
				}

				addSubscriber();

			}
        }

		// Replies to the interaction!
		
	}

	
};
