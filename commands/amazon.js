module.exports = {
	name: 'amazon',
	description: 'I am trying to get a .bot domain',
	cooldown: 5,
	execute(message) {
		message.channel.send('Response for .bot domain');
	},
};