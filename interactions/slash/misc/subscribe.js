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

const subscription = sequelize.define('subscription', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: Sequelize.STRING,
    dateSubscribed: Sequelize.DATE,
    dateExpired: Sequelize.DATE,
    addedBy: Sequelize.STRING,
    status: Sequelize.STRING,
    
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
		)
        .addSubcommand(subcommand => 
			subcommand
				.setName('checkall')
				.setDescription('Check all member\'s subscription status')
		),

	async execute(interaction) {

        if (!interaction.isChatInputCommand()) return;

        if (!interaction.member.roles.cache.some(r => r.name === "Moderator")){
            await interaction.reply('You are not allowed to use this command :poop:');
            return;
        } 

		if (interaction.commandName === 'subscribe') {

			if (interaction.options.getSubcommand() === 'add') {

				async function addSubscriber() {

					try {

                        const client = new Client({
                            // Please add all intents you need, more detailed information @ https://ziad87.net/intents/
                            intents: [
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.DirectMessages,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,
                                GatewayIntentBits.GuildMembers
                            ],
                        });

                        let guild = interaction.guild;

                        const guildMem = await guild.members.fetch(interaction.options.getString('id'));
                        
                        if( guildMem ){

                            

                            // let dateNow = Math.floor(new Date().getTime() / 1000);
                            let dateNow = moment();
                            let dateExpiration = moment().add(interaction.options.getInteger('type'), 'days');
                            let difference = dateExpiration.diff(dateNow, 'seconds');
                            let epochDateNow = moment().unix() + difference;

                            const subCheck = await subscription.findOne({where: {userID: interaction.options.getString('id') }});

                            if( !subCheck ){

                                subscription.create({
                                    userID: interaction.options.getString('id'),
                                    dateSubscribed: dateNow,
                                    dateExpired: dateExpiration,
                                    addedBy: interaction.member.displayName,
                                    status: 'Active'

                                }); 

                            } else if (subCheck.status == 'Inactive'){

                                subCheck.status = 'Active';
                                subCheck.dateSubscribed = dateNow;
                                subCheck.dateExpired = dateExpiration;
                                subCheck.addedBy = interaction.member.displayName;
                                subCheck.save();

                            }

                            let guild = interaction.guild;
                            const guildMem = await guild.members.fetch(interaction.options.getString('id'));

                            switch( interaction.options.getString('server') ){
                                case 'EL':
                                    guildMem.roles.add(['1031578164620705823']);
                                    break;
                                case 'MP':
                                    guildMem.roles.add(['1031578328798351521']);
                                    break;
                                case 'MOF':
                                    guildMem.roles.add(['1031577972295090278']);
                                    break;
                                case 'VG':
                                    break;
                                default:
                                    break;
                            }
                            

                            const newSubscriber = new EmbedBuilder()
                                .setTitle( 'New Subscription')
                                .setThumbnail( guildMem.avatarURL() )
                                .setDescription('You have added a new subscriber')
                                .setColor('Green')
                                .addFields({name: 'Display Name', value: guildMem.user.username})
                                .addFields({name: 'User ID', value: guildMem.user.id})
                                .addFields({name: 'Expiration', value: '<t:'+ epochDateNow +':R>'})

                            
                            await interaction.reply({ content: 'Great, a new subscriber!', embeds:[newSubscriber] });

                        }

					} catch (error) {
						console.log(error);
					}
				}

				addSubscriber();

			} else if (interaction.options.getSubcommand() === 'checkall') {

				async function checkSubscriber() {

					try {

                        const subscribers = await subscription.findAll({ where: { status: 'Active'} });
                        let dateNow = moment();
                        let expiredList = '\n';

                        if( subscribers.length != 0 ){

                            for(const subscriber of subscribers ){

                                let expirationDate = moment(subscriber.dateExpired);

                                if( expirationDate.diff(dateNow, 'seconds') <= 0 ){

                                    let guild = interaction.guild;
                                    const guildMem = await guild.members.fetch(subscriber.userID);
                                    guildMem.roles.remove([
                                        '1031577972295090278', //MOF
                                        '1031578328798351521', //MP
                                        '1031578164620705823', //EL
                                        '1031637263689457766', //antimage
                                        '1031637367536234547', //arcane
                                        '1031637397592612864', //arch
                                        '1031637510712991806', //armor
                                        '1031637564165214240', //armor breaking
                                        '1031637589112926208', //blasphemy
                                        '1031637701738364959', //divine blessing
                                        '1031637723854942268', //insight
                                        '1031637752804036629', //magic
                                        '1031734900665110639', //morale
                                        '1031734931858133012', //sharp
                                        '1031734960614293594', //sharp blade
                                        '1031734987898245141', //tenacity
                                        '1031735038875795466', //zeal
                                        '1031742694634029077', //snap all
                                        '1031742865107337377', //rare item
                                    ]);

                                    expiredList += '• ' + guildMem.user.username + ' - ' + subscriber.userID + '\n';

                                    const subs = await subscription.findOne({where: {userID: subscriber.userID }});
                                    subs.status = 'Inactive';
                                    subs.save();

                                }

                            }
                        } else {
                            expiredList = 'All subscriptions are active';
                        }

                        if(expiredList.length > 2){
                            const expiredSubscribers = new EmbedBuilder()
                                .setTitle( 'Expired Subscriptions')
                                .setThumbnail( 'https://i.imgur.com/N1I31SV.png' )
                                .setDescription('List of recently expired subscriptions.\nAll roles has been removed.')
                                .setColor('Blue')
                                .addFields({name: 'Unsubscribed List', value: expiredList})

                            await interaction.channel.send({ content: 'Here are the list of users who got their role stripped out.', embeds:[expiredSubscribers] });
                        } else {
                            const expiredSubscribers = new EmbedBuilder()
                                .setTitle( 'Expired Subscriptions')
                                .setThumbnail( 'https://i.imgur.com/N1I31SV.png' )
                                .setDescription('No expired subscriptions.')
                                .setColor('Blue')

                            await interaction.reply({ content: 'It looks like no one is going to be kicked out yet', embeds:[expiredSubscribers] });
                        }

                        

					} catch (error) {
						console.log(error); 
					}
				}

				checkSubscriber();

			}
        }
		
	}

	
};
