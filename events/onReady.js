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

        client.user.setPresence({ activities: [{ name: 'Snatching from the snatchers.'}] });

		// Initialize Reading List Database

		const Sequelize = require('sequelize');
        
        const cron = require('node-cron');
        
        const removePastSnaps = cron.schedule('*/5 * * * *', () => {

            //loop through all Rare Items for MOF

            const channelx = client.channels.cache.get( '1031580817593475082' );
            
            channelx.messages.fetch({ limit: 100 }).then(messages => {
                
                console.log(`Received ${messages.size} messages`);
                
                messages.forEach(msg => {
                    
                    msg.embeds.forEach( embed => {
                        try{
                            timestamp = embed.fields[2].value.split(':');
                            console.log(timestamp[1]);
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
                    
                    console.log(`Received ${messages.size} messages`);
                    
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

        },{
            timezone: 'Asia/Singapore'
        });
        
        // When you want to start it, use:
        removePastSnaps.start();




		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
