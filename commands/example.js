module.exports = {
	name: 'example',
    description: 'returns an example',
    usage:'an example usage',
    args: false,
	adminOnly: false,
	async execute(message) {
		message.channel.send(`This is an example`);
	},
};