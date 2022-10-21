/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */



module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {

        client.user.setPresence({ activities: [{ name: 'In the middle of developing something cool.'}] });

		// Initialize Reading List Database

		const Sequelize = require('sequelize');
        const moment = require('moment');
        const { EmbedBuilder } = require("discord.js");

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
            status: Sequelize.STRING
            
        });

        subscription.sync();
        
        const cron = require('node-cron');
        
        const removePastSnaps = cron.schedule('*/1 * * * *', () => {

            //loop through all Rare Items for MOF

            try {

                const channelx = client.channels.cache.get( '1031580817593475082' );
            
                channelx.messages.fetch({ limit: 100 }).then(messages => {
                    
                    messages.forEach(msg => {
                        
                        msg.embeds.forEach( embed => {
                            try{
                                timestamp = embed.fields[2].value.split(':');
                                if(timestamp[1] < (Date.now() / 1000)){
                                    msg.delete();
                                }
                            } catch {
                                console.log('Error deleting');
                            }
                            
                        })
                        
                    });
                    
                });
                
                let mofChannels = [ 
                    '1031579459368792084', 
                    '1031579568458432584', 
                    '1031579590990254090', 
                    '1031579612641251442', 
                    '1031579635814776882',
                    '1031579654290690158',
                    '1031579677413875852',
                    '1031579697043210320',
                    '1031579716903243936',
                    '1031579735530160168',
                    '1031579766492495964',
                    '1031579784490262608',
                    '1031579804035711067',
                    '1031580712056410132',
                ];

                mofChannels.forEach(channel => {
                    
                    //loop through all Enchant Channels for MOF
                    const channelz = client.channels.cache.get(channel);
                    
                    channelz.messages.fetch({ limit: 100 }).then(messages => {
                        
                        messages.forEach(msg => {
                            
                            msg.embeds.forEach( embed => {
                                try{
                                    timestamp = embed.fields[3].value.split(':');
                                    if(timestamp[1] < (Date.now() / 1000)){
                                        console.log(embed.title);
                                        msg.delete();
                                    }
                                } catch {
                                    try{
                                        timestamp = embed.fields[2].value.split(':');
                                        if(timestamp[1] < (Date.now() / 1000)){
                                            msg.delete();
                                        }
                                    } catch {
                                        console.log('Error deleting');
                                    }
                                }
                                
                            })
                            
                        });
                        
                    });
                });

            } catch (error) {

                console.log(error);
                
            }

            

        },{
            timezone: 'Asia/Singapore'
        });


        const checkExpiredSubscriptions = cron.schedule('*/1 * * * *', () => {

            async function checkSubscriber() {

                try {

                    const subscribers = await subscription.findAll({ where: { status: 'Active'} });
                    let dateNow = moment();
                    let expiredList = '\n';

                    if( subscribers.length != 0 ){

                        for(const subscriber of subscribers ){

                            let expirationDate = moment(subscriber.dateExpired);

                            if( expirationDate.diff(dateNow, 'seconds') <= 0 ){

                                let guild = await client.guilds.fetch('1031494740287442965')
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

                        if( expiredList.length > 2 ){
                            const expiredSubscribers = new EmbedBuilder()
                                .setTitle( 'Expired Subscriptions')
                                .setThumbnail( 'https://i.imgur.com/N1I31SV.png' )
                                .setDescription('List of recently expired subscriptions.\nAll roles has been removed.')
                                .setColor('Blue')
                                .addFields({name: 'Unsubscribed List', value: expiredList})

                            await client.channels.cache.get('1032936443544358912').send({content: '<@&1031496606048067614>', embeds:[expiredSubscribers] });
                        }

                        
                    }

                } catch (error) {
                    console.log(error); 
                }
            }

            checkSubscriber();

        },{
            timezone: 'Asia/Singapore'
        });
        
        // When you want to start it, use:
        removePastSnaps.start();
        checkExpiredSubscriptions.start();



		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
