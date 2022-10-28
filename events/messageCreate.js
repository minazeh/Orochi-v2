/**
 * @file Message Based Commands Handler
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Declares constants (destructured) to be used in this file.

const { Collection, ChannelType, Client, EmbedBuilder } = require("discord.js");
const { prefix, owner } = require("../config.json");

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

			let index = 0;
			let embedArray = message.content.split("\n");
			embedArray.forEach(elem => {
				index++;
			});

			if( index == 13 ){
				//enchanted items
				let embedTitle = embedArray[0];

				if( embedTitle.indexOf(':broken:') !== -1 ){
					embedTitle = embedTitle.replace(':broken:', '<:broken:1031755813917835284>');
				}

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
				
				if( embedArray[9].includes('Anti') ){

					client.channels.cache.get('1031579459368792084').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&1031742694634029077> <@&1031637263689457766>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1005670231487815700').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525082855063592>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Arcane') ){
					client.channels.cache.get('1031579568458432584').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&1031742694634029077> <@&1031637367536234547>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035571630535086096').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525412007264318>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Arch') ){
					client.channels.cache.get('1031579590990254090').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637397592612864>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572016423649280').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525493439668334>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Breaking') ){
					client.channels.cache.get('1031579635814776882').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637564165214240>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572232249933844').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525577250246687>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Armor') && !embedArray[9].includes('Breaking') ){
					client.channels.cache.get('1031579612641251442').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637510712991806>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572145734025307').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525529653289030>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Blasphemy') ){
					client.channels.cache.get('1031579654290690158').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637589112926208>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572593153024000').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525631709106196>',  embeds: [snapperist] });
					
				} else if( embedArray[9].includes('Divine') ){
					client.channels.cache.get('1031579677413875852').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637701738364959>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572711461761024').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525708263530547>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Insight') ){
					client.channels.cache.get('1031579697043210320').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637723854942268>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572844882579486').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525761933836359>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Magic') ){
					client.channels.cache.get('1031579716903243936').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031637752804036629>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572926352740433').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525804623483002>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Morale') ){
					client.channels.cache.get('1031579735530160168').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031734900665110639>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035572977833623602').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525854380503040>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Blade') ){
					client.channels.cache.get('1031579766492495964').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031734960614293594>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035573072591343676').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525914103197788>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Sharp') && !embedArray[9].includes('Blade') ){
					client.channels.cache.get('1031579784490262608').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031734931858133012>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035573122608418857').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525946038628463>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Tenacity') ){
					client.channels.cache.get('1031579804035711067').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031734987898245141>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035573185686552576').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993525989646803074>',  embeds: [snapperist] });

				} else if( embedArray[9].includes('Zeal') ){
					client.channels.cache.get('1031580712056410132').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**'  + '\n<@&1031742694634029077> <@&1031735038875795466>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035573274068926515').send({content: embedTitle + ' | ' + splitedEnchant[0] + '**' + '\n<@&993538058978869368> <@&993526031845691452>',  embeds: [snapperist] });
					
				}
				
			} else if (index == 8 ){
				// rare items
				let embedTitle = embedArray[0];
				if( embedTitle.indexOf(':broken:') !== -1 ){
					embedTitle = embedTitle.replace(':broken:', '<:broken:1031755813917835284>');
				}
				const embedThumb = embedArray[7].split('URL=')
				const snapperist = new EmbedBuilder()
				.setTitle(embedTitle)
				.setThumbnail(embedThumb[1])
				.addFields({name: 'Server', value: embedArray[2] })
				.addFields({name: 'Price', value: embedArray[4] })
				.addFields({name: 'Expiry', value: embedArray[6] })
				.setColor('#5D1ABC');

				if( embedTitle.indexOf(']') !== -1 || embedTitle.indexOf('+') !== -1 ){ //check if item has slot or not

					client.channels.cache.get('1035578856955973713').send({content: embedTitle + ' is on market.\n<@&1031742694634029077>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('1035578334362488903').send({content: embedTitle + ' is on market.\n<@&993538058978869368>',  embeds: [snapperist] });
					

				} else if( embedTitle.indexOf(' Card') !== -1  ){ //check if item is a card

					client.channels.cache.get('1035590385591930971').send({content: embedTitle + ' is on market.\n<@&1031742694634029077> <@&1035590714064642069>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('993540758139322479').send({content: embedTitle + ' is on market.\n<@&993568936085958808>',  embeds: [snapperist] });	

				} else if( embedTitle.indexOf('Blueprint') !== -1 ){ //check if item is a card

					client.channels.cache.get('1035590427207811164').send({content: embedTitle + ' is on market.\n<@&1031742694634029077> <@&1035590882407223347>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('993540758139322479').send({content: embedTitle + ' is on market.\n<@&993568936085958808>',  embeds: [snapperist] });	

				} else {

					client.channels.cache.get('1031580817593475082').send({content: embedTitle + ' is on market.\n<@&993538058978869368> <@&1031742865107337377>',  embeds: [snapperist] });

					//Paranoia
					client.channels.cache.get('993540758139322479').send({content: embedTitle + ' is on market.\n<@&993568936085958808>',  embeds: [snapperist] });

				}

				
				
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
