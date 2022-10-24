/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("botstatus")
		.setDescription(
			"Check bot's status"
		),

	async execute(interaction) {
		
		let guild = interaction.guild;

        const guildMem = await guild.members.fetch('1027480076717142076');

		// Replies to the interaction!
		await interaction.reply({ content: 'The bot is ' + guildMem.presence.status, ephemeral: true });
		
	}

	
};
