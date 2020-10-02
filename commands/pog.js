const jsonfile = require ('jsonfile');
const fs = require('fs');
const Canvas = require('canvas');
const {registerFont} = require('canvas');
const Discord = require('discord.js');

registerFont('./fonts/Rajdhani-Bold.ttf', { family: 'Rajdhani' })

const displayName = (message) => {
	const dispName = message.member.nickname
	return dispName === null ? message.author.username : dispName;
}

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 200;

	do {
		ctx.font = `${fontSize -= 10}px Rajdhani`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};

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

		if (userStats.background === undefined) {
			userStats.background = 0;
		}
		const backgroundSRC = `./assets/background${userStats.background}.png`;
		message.channel.send(`You are using ${backgroundSRC}`)

		
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage(backgroundSRC);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  

		ctx.save();

		
		let memberUsername = `${displayName(message)}`
		ctx.font = applyText(canvas, memberUsername);
		ctx.fillStyle = '#ffffff';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowBlur = 7;
		ctx.fillText(memberUsername, canvas.width / 2.7, canvas.height / 1.7);


		ctx.font = '40px Rajdhani';
		ctx.fillStyle = '#ffffff';
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowBlur = 7;
		ctx.fillText(`You are currently Level ${userStats.level}`, canvas.width / 2.7, canvas.height / 1.2);
		
		ctx.restore();
		
		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#d4d4d4';
		ctx.fill();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#ffffff';
		ctx.stroke();


		ctx.beginPath();
		ctx.arc(125, 125, 95, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
		ctx.drawImage(avatar, 25, 25, 200, 200);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'test.png');
		message.reply(``, attachment);
	}
};