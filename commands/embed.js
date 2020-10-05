const Discord = require('discord.js');


const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
	name: 'embed',
	description: 'Builds or edits an embed',
    args: false,
	async execute(message) {
					var exampleEmbed = {
						color: 0x0099ff,
						title: 'Some title',
						url: 'https://discord.js.org',
						author: {
							name: 'Some name',
							icon_url: 'https://i.imgur.com/wSTFkRM.png',
							url: 'https://discord.js.org',
						},
						description: 'Some description here',
						thumbnail: {
							url: 'https://i.imgur.com/wSTFkRM.png',
						},
						fields: [
							{
								name: 'Regular field title',
								value: 'Some value here',
							},
							{
								name: '\u200b',
								value: '\u200b',
								inline: false,
							},
							{
								name: 'Inline field title',
								value: 'Some value here',
								inline: true,
							},
							{
								name: 'Inline field title',
								value: 'Some value here',
								inline: true,
							},
							{
								name: 'Inline field title',
								value: 'Some value here',
								inline: true,
							},
						],
						image: {
							url: 'https://i.imgur.com/wSTFkRM.png',
						},
						timestamp: new Date(),
						footer: {
							text: 'Some footer text here',
							icon_url: 'https://i.imgur.com/wSTFkRM.png',
						},
					};
		
		
        message.channel.send({ embed: exampleEmbed });
		await delay(5000);
        var exampleEmbed = new Discord.MessageEmbed()
	.setTitle('Some title')
	.setDescription('Description after the edit');

message.edit(exampleEmbed);

		//message.channel.send(`First argument: ${args[0]}`);
	},
};