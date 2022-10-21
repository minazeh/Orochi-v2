/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
		.setName("profile")
		.setDescription(
			"Get user profile."
		),

	async execute(interaction) {

		const userProfile = new EmbedBuilder()
            .setTitle( 'User Information' )
            .setColor('Random')
            .setThumbnail(interaction.member.avatarURL())
			.addFields({name: 'Display Name', value: interaction.member.displayName})
			.addFields({name: 'User ID', value: interaction.member.id})

        let snapRoles = [
            'Anti-Mage',
            'Arcane',
            'Arch',
            'Armor',
            'Armor Breaking',
            'Blasphemy',
            'Divine Blessing',
            'Insight',
            'Magic',
            'Morale',
            'Sharp',
            'Sharp Blade',
            'Tenacity',
            'Zeal',
            'Snap All',
            'Rare Item'
        ];

        let snapRoleString = '\n';

        snapRoles.forEach( snapRole => {

            if(interaction.member.roles.cache.some(r => r.name === snapRole)){
                snapRoleString += ':sparkles: ' + snapRole + '\n';
            }

        });

        if( snapRoleString.length < 4){
            snapRoleString = 'No snap role set';
        }

        if(interaction.member.roles.cache.some(r => r.name === 'Eternal Love')){

			userProfile.addFields({name: 'Server', value: ':fire: SEA Eternal Love'});
			userProfile.addFields({name: 'Snap Roles', value: snapRoleString});

        } else if(interaction.member.roles.cache.some(r => r.name === 'Midnight Party')){

			userProfile.addFields({name: 'Server', value: ':fire: SEA Midnight Party'});
			userProfile.addFields({name: 'Snap Roles', value: snapRoleString});

        } else if(interaction.member.roles.cache.some(r => r.name === 'Memory of Faith')){

			userProfile.addFields({name: 'Server', value: ':fire: SEA Memory of Faith'});
			userProfile.addFields({name: 'Snap Roles', value: snapRoleString});

        } else {
			userProfile.addFields({name: 'Subscribed', value: 'No :poop:'});
        }

        const subs = await subscription.findOne({where: {userID: interaction.member.id, status: 'Active' }});
        
        if (subs) {
            let dateNow = moment();
            let dateExpiration = moment(subs.dateExpired);
            let difference = dateExpiration.diff(dateNow, 'seconds');
            let epochDateNow = moment().unix() + difference;
            userProfile.addFields({name: 'Subscription Expiry', value: '<t:'+ epochDateNow +':R>'});
        } else {
            userProfile.addFields({name: 'Subscription Expiry', value: 'Permanent'});
        }

		// Replies to the interaction!
		await interaction.reply({ content: 'Showing your user profile', embeds: [userProfile] });
		
	}

	
};
