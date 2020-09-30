const jsonfile = require ('jsonfile');
const fs = require('fs');
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
	name: 'pog',
	description: 'Shows user level',
	cooldown: 5,
	async execute(message) {
		var stats ={};
		if (fs.existsSync('levels.json')) {
			stats = jsonfile.readFileSync('levels.json')
		}
		const guildStats = stats[message.guild.id];
		const userStats = guildStats[message.author.id]
		message.reply(`You are currently level ${userStats.level}`)
		
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');
		// we need to await the Promise gets resolved since loading of Image is async
		const background = await Canvas.loadImage('./assets/background1.png');

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'test.png');
		message.channel.send(`Testing...`, attachment);
	}
};