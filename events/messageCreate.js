/**
 * @file Message Based Commands Handler
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Declares constants (destructured) to be used in this file.

const { Collection, ChannelType, Client, EmbedBuilder } = require("discord.js");
const { prefix, owner } = require("../config.json");
const fs = require('fs');

// Prefix regex, we will use to match in mention prefix.

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message & { client: import('../typings').Client }} message The message which was created.
	 */

	async execute(message) {
		// Declares const to be used.

		const { client, guild, channel, content, author } = message;

		// Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
		// You can change the behavior as per your liking at ./messages/onMention.js

		
		if( message.channel.id == '993205836048511068'){

			try {
				fs.readFile('./guilds.json', 'utf8', (err, data) => {

					if (err) {

						console.log(`Error reading file from disk: ${err}`)

					} else {

						
						const romGuilds = JSON.parse(data);

						let index = 0;
						let embedArray = message.content.split("\n");
						embedArray.forEach(elem => {
							index++;
						});

						if( index == 13 ){ // Enchanted Items => Index == 13

							let embedTitle = embedArray[0];

							if( embedTitle.indexOf(':broken:') !== -1 ){
								embedTitle = embedTitle.replace(':broken:', '<:broken:1031755813917835284>');
							}
							
							const server = embedArray[2];

							const embedThumb = embedArray[12].split('URL=')
							const splitedEnchant = embedArray[9].split(':');
							const snapperist = new EmbedBuilder()
							.setTitle(embedTitle)
							.setThumbnail(embedThumb[1])
							.addFields({name: 'Server', value: embedArray[2] })
							.addFields({name: 'Price', value: embedArray[4] })
							.addFields({name: 'Enchants', value: embedArray[6] + '\n' + embedArray[7] + '\n' + embedArray[8] + '\n **' + embedArray[9] + '**' })
							.addFields({name: 'Expiry', value: embedArray[11] })
							.setColor('#5D1ABC');


							let romServer;

							// Select which server is the item from
							if( server === 'SEA Eternal Love' ){
								romServer = romGuilds.el;
							} else if( server === 'SEA Midnight Party' ){
								romServer = romGuilds.mp;
							} else if( server === 'SEA Memory of Faith' ){
								romServer = romGuilds.mof;
							}

							// Fetch guilds from those server
							romServer.forEach( guilds => {

								let channelID;
								let roleID;
								let snapAllID;
								let ping = false;

								guilds.channels.forEach( channels => {

									if( embedArray[9].includes('Anti') ){

										if( channels.name === 'Anti-Mage' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Arcane') ){
										
										if( channels.name === 'Arcane' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Arch') ){

										if( channels.name === 'Arch' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Breaking') ){
										
										if( channels.name === 'Armor Breaking' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Armor') && !embedArray[9].includes('Breaking') ){
										
										if( channels.name === 'Armor' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Blasphemy') ){
										
										if( channels.name === 'Blasphemy' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Divine') ){

										if( channels.name === 'Divine Blessing' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
										
									} else if( embedArray[9].includes('Insight') ){

										if( channels.name === 'Insight' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
										
									} else if( embedArray[9].includes('Magic') ){

										if( channels.name === 'Magic' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
										
									} else if( embedArray[9].includes('Morale') ){
										
										if( channels.name === 'Morale' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Blade') ){
										
										if( channels.name === 'Sharp Blade' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedArray[9].includes('Sharp') && !embedArray[9].includes('Blade') ){

										if( channels.name === 'Sharp' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
									
									} else if( embedArray[9].includes('Tenacity') ){

										if( channels.name === 'Tenacity' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
										
									} else if( embedArray[9].includes('Zeal') ){

										if( channels.name === 'Zeal' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
										
									}

								});

								if (embedArray[9].includes('3') || embedArray[9].includes('4')){
									client.channels.cache.get( channelID ).send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&'+ roleID +'> <@&'+ snapAllID +'>',  embeds: [snapperist] });
								} else {
									client.channels.cache.get( channelID ).send({content: embedTitle + ' | ' + splitedEnchant[0] + '**',  embeds: [snapperist] });
								}
								
							});

						} else if (index == 8 ){
							// rare items
							let embedTitle = embedArray[0];
							if( embedTitle.indexOf(':broken:') !== -1 ){
								embedTitle = embedTitle.replace(':broken:', '<:broken:1031755813917835284>');
							}

							const server = embedArray[2];
							const embedThumb = embedArray[7].split('URL=')
							const snapperist = new EmbedBuilder()
							.setTitle(embedTitle)
							.setThumbnail(embedThumb[1])
							.addFields({name: 'Server', value: embedArray[2] })
							.addFields({name: 'Price', value: embedArray[4] })
							.addFields({name: 'Expiry', value: embedArray[6] })
							.setColor('#5D1ABC');

							let romServer;

							// Select which server is the item from
							if( server === 'SEA Eternal Love' ){
								romServer = romGuilds.el;
							} else if( server === 'SEA Midnight Party' ){
								romServer = romGuilds.mp;
							} else if( server === 'SEA Memory of Faith' ){
								romServer = romGuilds.mof;
							}

							romServer.forEach( guilds => {

								let channelID;
								let roleID;
								let snapAllID;

								guilds.channels.forEach( channels => {
									
									if( embedTitle.indexOf(']') !== -1 || embedTitle.indexOf('+') !== -1 ){ 
										//check if item has slot or not
										if( channels.name === 'No Enchants' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}
									
									} else if( embedTitle.indexOf('Card') !== -1  ){ 
										//check if item is a card	
										if( channels.name === 'Cards' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else if( embedTitle.indexOf('Blueprint') !== -1 ){ 
										//check if item is a blueprint
										if( channels.name === 'Blueprints' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									} else {
										//if nothing checks out, its a rare item
										if( channels.name === 'Rare Items' ){
											channelID = channels.channel_id;
											roleID = channels.role_id;
											snapAllID = channels.snapall_id;
										}

									}

								});

								client.channels.cache.get(channelID).send({content: embedTitle + ' is on market.\n<@&'+ roleID +'> <@&'+ snapAllID +'>',  embeds: [snapperist] });

							});
							
						}

					}

				});
			} catch (error) {
				console.log(error);
			}
			
		}

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message);
			return;
		}

		/**
		 * @description Converts prefix to lowercase.
		 * @type {String}
		 */

		const checkPrefix = prefix.toLowerCase();

		/**
		 * @description Regex expression for mention prefix
		 */

		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);

		// Checks if message content in lower case starts with bot's mention.

		if (!prefixRegex.test(content.toLowerCase())) return;

		/**
		 * @description Checks and returned matched prefix, either mention or prefix in config.
		 */

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

		/**
		 * @type {String[]}
		 * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
		 */

		const args = content.slice(matchedPrefix.length).trim().split(/ +/);

		/**
		 * @type {String}
		 * @description Name of the command received from first argument of the args array.
		 */

		const commandName = args.shift().toLowerCase();
		

		// Check if mesage does not starts with prefix, or message author is bot. If yes, return.

		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return;

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		// It it's not a command, return :)

		if (!command) return;

		// Owner Only Property, add in your command properties if true.

		if (command.ownerOnly && message.author.id !== owner) {
			return message.reply({ content: "This is a owner only command!" });
		}

		// Guild Only Property, add in your command properties if true.

		if (command.guildOnly && message.channel.type === ChannelType.DM) {
			return message.reply({
				content: "I can't execute that command inside DMs!",
			});
		}

		// Author perms property
		// Will skip the permission check if command channel is a DM. Use guildOnly for possible error prone commands!

		if (command.permissions && message.channel.type !== ChannelType.DM) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "You can not do this!" });
			}
		}

		// Args missing

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send({ content: reply });
		}

		// Cooldowns

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply({
					content: `please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${command.name}\` command.`,
				});
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		// Rest your creativity is below.

		// execute the final command. Put everything above this.
		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply({
				content: "There was an error trying to execute that command!",
			});
		}
		
		

	},
};
