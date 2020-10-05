const fs = require('fs');
const Discord = require('discord.js');
const {token } = require('./config.json');
const jsonfile = require ('jsonfile');

const client = new Discord.Client({partials: ['MESSAGE','CHANNEL','REACTION']});
client.commands = new Discord.Collection();

//code to return DisplayName/username were needed
const displayName = (message) => {
	const dispName = message.member.nickname;
	return dispName === null ? message.author.username : dispName;
	
}

var settings={};
if (fs.existsSync('settings.json')) {
	settings = jsonfile.readFileSync('settings.json')
}

var stats ={};
if (fs.existsSync('levels.json')) {
    stats = jsonfile.readFileSync('levels.json')
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	client.user.setStatus('available')
    client.user.setActivity("with depression", {
		type: "STREAMING",
		url: "https://www.twitch.tv/furSUDO"
	  });
	console.log('Ready!');
});

client.on("guildMemberAdd", (member) => {
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  });

client.on('message', async message => {
	if (message.guild.id in settings === false) {
		settings[message.guild.id]={
			nsfw: 0,
			leveling: 0,
			botUpdates: 0,
			prefix: "!"			
		};
		jsonfile.writeFileSync('settings.json',settings)
	}
	const guildSettings = settings[message.guild.id];
	const prefix = guildSettings.prefix;
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) {
		
		if (guildSettings.leveling === 1) {
			if (message.guild.id in stats === false) {
				stats[message.guild.id]={};
			}
			const guildStats = stats[message.guild.id];
		
			if (message.author.id in guildStats === false) {
				guildStats[message.author.id] = {
					xp: 0,
					level: 0,
					last_message: 0,
					background: 0
				};        
			}
			const userStats = guildStats[message.author.id]
			if (Date.now()-userStats.last_message > 100) {
				
					userStats.xp += Math.floor(Math.random()*7)+500;
					userStats.last_message = Date.now();
				
					const xpToNextLevel = 5 * Math.pow(userStats.level,2)+50*userStats.level;
					if (userStats.xp >= xpToNextLevel) {
						userStats.level++;
						userStats.xp = userStats.xp - xpToNextLevel;
						console.log(`${displayName(message)} has reached level ${userStats.level}`)
					}
				
					jsonfile.writeFileSync('levels.json',stats)
					
					console.log(`${displayName(message)} now has ${userStats.xp}`);
					console.log(`${xpToNextLevel} needed to lvl up`);
				
			}
		}
	} else {
		
		console.log(message.content);
		//const regex2 = /(?=.*<@!480495309491798037>)/im;
		//const regex = /(?=.*SUDO)(?=.*is)(?=.*cute)/im;
		//let m;
		//if (!message.guild) return;
		//if ((m = regex.exec(message.content)) !== null) {
			//	message.delete();
			//	let channel = message.channel;
			//	channel.createInvite({unique: true}).then(invite => {
				//		message.author.send(`You have been kicked from the server for calling SUDO cute.\nHere is a link to join back ${invite}`);
				//	}).catch((err) => {
					//		
					//	});
					//	message.reply
					//	message.member.kick().then((member) => {
						//		// Successmessage
						//		message.channel.send(`Nuuuuu! >:C\n${member} was kicked for calling SUDO cute`);
						//		message.channel.send(`<:SUDO_L_Knife_1:756994302621515786><:SUDO_L_Knife_2:756994315515068486>\n<:SUDO_L_Knife_3:756994334108155995><:SUDO_L_Knife_4:756994347550900275>`);
						//    }).catch(() => {
							//         // Failmessage
							//        console.log("oh shit oh fuck");
							//    });
							//}
							
							//if ((m = regex.exec(message.content)) !== null) {
								//	let channel = message.channel;
								//	channel.createInvite({unique: true}).then(invite => {
									//		message.channel.send(`<@!480495309491798037>`);
									//	}).catch((err) => {
										//		
										//	});
										//}
										
										if (!message.content.startsWith(prefix) || message.author.bot) return;
										const args = message.content.slice(prefix.length).trim().split(/ +/);
										const commandName = args.shift().toLowerCase();
										
										
										
										const command = client.commands.get(commandName)
										|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
										
										if (!command) return;
										
										if (command.guildOnly && message.channel.type === 'dm') {
											return message.reply('I can\'t execute that command inside DMs!');
										}
										
										if (command.args && !args.length) {
											let reply = `You didn't provide any arguments, ${message.author}!`;
											
											if (command.usage) {
												reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
											}
											
											return message.channel.send(reply);
										}
										
										if (!cooldowns.has(command.name)) {
											cooldowns.set(command.name, new Discord.Collection());
										}
										
										const now = Date.now();
										const timestamps = cooldowns.get(command.name);
										const cooldownAmount = (command.cooldown || 3) * 1000;
										
										if (timestamps.has(message.author.id)) {
											const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
											
											if (now < expirationTime) {
												const timeLeft = (expirationTime - now) / 1000;
												return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
											}
										}
										
										timestamps.set(message.author.id, now);
										setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
										
										try {
											command.execute(message, args);
										} catch (error) {
											console.error(error);
											message.reply('there was an error trying to execute that command!');
										}
										}
									});
									
									client.login(token);