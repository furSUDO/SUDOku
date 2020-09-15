const Discord = require('discord.js');
module.exports = {
	name: 'embed',
	description: 'Builds or edits an embed',
    args: true,
	execute(message, args) {
        const inputArgs = Array.from(args);
        const firstArg = inputArgs.shift();

        switch (firstArg.toLowerCase()) {
            case 'edit':
                //return message.channel.send(`arg1: ${firstArg}\ntoString: ${inputArgs.join(' ')}`);
                const filter = m => m.author.id === message.author.id;
                message.channel.send(">>> What is the ID of the message you'd like to edit?").then(sent => {
                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            message.channel.send(`>>> editing ${collected.first().content}`);
                            sent.delete();
                            message.delete();
                        })
                        .catch(collected => {
                            message.channel.send(`>>> You didn't provide me with an ID in time,\noperation canceled`);
                        });
                });
                break;
            case 'send':
                return message.channel.send('send');

                break;
        }

		//message.channel.send(`First argument: ${args[0]}`);
	},
};