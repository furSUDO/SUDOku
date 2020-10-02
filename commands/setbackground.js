const fs = require('fs');
const Discord = require('discord.js');
const jsonfile = require ('jsonfile');

module.exports = {
	name: 'setbackground',
	description: 'Ping!',
	cooldown: 5,
	execute(message,args) {
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
			if (args >= 0 && args <= 15) {userStats.background = args;jsonfile.writeFileSync('levels.json',stats);}
			else{message.reply(`${args} is not a number between 0 and 15`)};
		}
	},
};