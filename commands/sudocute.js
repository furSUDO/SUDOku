const Discord = require('discord.js');
module.exports = {
	name: 'sudocute',
	description: 'Builds or edits an embed',
    args: true,
	execute(message, args) {
        const inputArgs = Array.from(args);
        const firstArg = inputArgs.shift();

        const regex = /(?=.*SUDO)(?=.*is)(?=.*cute)/im;
        const str = `art by thisperson`;
let m;

if ((m = regex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}

		//message.channel.send(`First argument: ${args[0]}`);
	},
};