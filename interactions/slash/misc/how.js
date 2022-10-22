/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("how")
		.setDescription(
			"How to subscribe to the snapper"
		),

	async execute(interaction) {

        const howTo = new EmbedBuilder()
            .setTitle( 'Nidhoggr\'s Guide' )
            .setDescription('Here are some helpful tips to get you started')
            .setColor('Random')
			.addFields({name: 'Subscribe', value: 'Reach out to one of our moderators to subscribe. \nIf by any chance that no moderator is available, you can open a subscription ticket on <#1031818446767390741>.'})
            .addFields({name: 'Mode of Payment', value: 'GCash, PayPal & Bank Transfer'})
			.addFields({name: 'Snap Roles', value: 'Once you are already subscribed, you can check your subscription duration using `/profile` command.\n\nYou can then head to <#1031630243213082734> and select which roles you want to get notified to. '})
            .addFields({name: 'Snap Request', value: 'If for some reason the item you want is not showing on the snapper, you can submit a request on <#1031613932852478053>'})

		await interaction.reply({ content: 'You might want to read this!', ephemeral: true, embeds:[howTo] });
		
	}

	
};
