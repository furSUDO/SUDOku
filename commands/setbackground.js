const fs = require('fs');
const Discord = require('discord.js');
const jsonfile = require ('jsonfile');


module.exports = {
	name: 'setbackground',
	description: 'Set the background of your level profile!',
	cooldown: 5,
	execute(message,args) {
		var settings={};
		if (fs.existsSync('settings.json')) {
			settings = jsonfile.readFileSync('settings.json')
		}
		const guildSettings = settings[message.guild.id];
		if (guildSettings.leveling === 1) {
			args = args.join();
			console.log(args);
			var stats ={};
			if (fs.existsSync('levels.json')) {
				stats = jsonfile.readFileSync('levels.json')
			}
			const guildStats = stats[message.guild.id];
			const userStats = guildStats[message.author.id];
			if (args=='') {
				message.reply("You haven't selected a background.\nPlease choose a number between ``0 and 12``")
			} else {
				if (args >= 0 && args <= 15) {userStats.background = args;jsonfile.writeFileSync('levels.json',stats);message.reply(`You have now changed your profile background to **background ${args}**`)}
				else{message.reply(`${args} is not a number between 0 and 15`)};
			}
		}else{
			message.reply("Leveling is not enabled in this server!\nPlease ask an admin to run "+'``'+guildSettings.prefix+"module enable leveling"+'``');
		}
	},
};