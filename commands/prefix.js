module.exports = {
	name: 'prefix',
	description: 'Change the prefix of SUDOku',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pong.');
	},
};