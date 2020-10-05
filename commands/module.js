const fs = require('fs');
const Discord = require('discord.js');
const jsonfile = require ('jsonfile');


module.exports = {
	name: 'module',
	description: 'enable/disable SUDOku modules',
	cooldown: 5,
	execute(message,args) {
		if (message.member.hasPermission('BAN_MEMBERS')) {
			var settings={};
			if (fs.existsSync('settings.json')) {
				settings = jsonfile.readFileSync('settings.json')
			}
			const guildSettings = settings[message.guild.id];
			console.log(args[1])
			switch (args[1]) {
				case "nsfw":
					if (args[0] === "enable") {
						guildSettings.nsfw = 1;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else if (args[0] === "disable"){
						guildSettings.nsfw = 0;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else {
						message.reply(`You did not state whether or not you wish to enable/disable the ${args[1]} module\nplease run `+'``'+`${guildSettings.prefix}module enable/disable module-name`+'``')
					}
					break;
				case "leveling":
					if (args[0] === "enable") {
						guildSettings.leveling = 1;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else if (args[0] === "disable"){
						guildSettings.leveling = 0;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else {
						message.reply(`You did not state whether or not you wish to enable/disable the ${args[1]} module\nplease run `+'``'+`${guildSettings.prefix}module enable/disable module-name`+'``')
					}
					break;
				
				case "levels":
					if (args[0] === "enable") {
						guildSettings.leveling = 1;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else if (args[0] === "disable"){
						guildSettings.leveling = 0;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else {
						message.reply(`You did not state whether or not you wish to enable/disable the ${args[1]} module\nplease run `+'``'+`${guildSettings.prefix}module enable/disable module-name`+'``')
					}
					break;
				case "botupdates":
					if (args[0] === "enable") {
						guildSettings.botUpdates = 1;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else if (args[0] === "disable"){
						guildSettings.botUpdates = 0;
						message.reply(`The ${args[1]} module has been ${args[0]}d`)
					} else {
						message.reply(`You did not state whether or not you wish to enable/disable the ${args[1]} module\nplease run `+'``'+`${guildSettings.prefix}module enable/disable module-name`+'``')
					}
					break;
				default:
					message.reply(`You did not stipulate a module to enable/disable\nplease run `+'``'+`${guildSettings.prefix}module enable/disable module-name`+'``')
					break;
			}
			jsonfile.writeFileSync('settings.json',settings)
		}else{
			message.reply(`You do not have the required permissions to run this command`)
		}
	},
};