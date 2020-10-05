const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'displays a list of active commands',
	cooldown: 5,
	execute(message) {
		const helpEmbed = new Discord.MessageEmbed()
    	    .setColor('#69388')
            .setTitle("e621 search for tag(s) "+title)
            .setImage(file.url)
            .setAuthor('e621 Discord Browser')
            .setThumbnail('https://e621.net//apple-touch-icon.png')
            .addFields(
                { name: 'Score', value: `<:up:722085960703279254>: _${score.up}_\n<:down:722085972262781331>: _${score.down}_`},
                { name: 'Artist', value: `${artist}`},
            )
            .setTimestamp()
            .setFooter('Made by SUDO#4072', 'https://cdn.discordapp.com/attachments/756644176795533334/761154213019254784/WOBBLY_ICON_BASE.gif');
            
            message.channel.send(helpEmbed);
	},
};