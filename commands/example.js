module.exports = {
	name: 'example',
    description: 'returns an example',
    usage:'an example usage',
    args: false,
	adminOnly: false,
	async execute(message, args, prefix, settings) {
		let stringSettings = JSON.stringify(settings);
		let exampleString =
			`This is an example.\nFrom commands you can access:\n` +
			`- Message arguments: \`${args.length > 0 ? args : " "}\`\n` +
			`- The Current server prefix: \`${prefix}\`\n` +
			`- The Current bot settings: \`${stringSettings}\`\n` +
			`\nRead more in the README.md file`;
		message.channel.send(exampleString);
	},
};