const fs = require('fs');
const Discord = require('discord.js');
const jsonfile = require ('jsonfile');

module.exports = {
	name: 'prefix',
	description: 'Change the prefix of SUDOku',
	cooldown: 30,
	adminOnly: true,
	args: true,
	usage: 'newPrefix',
	execute(message,args) {
		var settings={};
			if (fs.existsSync('settings.json')) {
				settings = jsonfile.readFileSync('settings.json')
			}
			const guildSettings = settings[message.guild.id];
			guildSettings.prefix = args[0]
			message.reply(`You have changed the prefix for SUDOku to `+"``"+args[0]+"``")
			jsonfile.writeFileSync('settings.json',settings)
	},
};