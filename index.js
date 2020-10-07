//Required node modules
const fs = require("fs");
const Discord = require("discord.js");
const jsonfile = require("jsonfile");

//creates config file to hold bot token and optional debug mode
var config = {};
if (!fs.existsSync("config.json")) {
    config = {token:"your token here",SUdebugMode:false};
    jsonfile.writeFileSync("config.json", config);
    console.log(`You have started the bot for the first time, please edit the config.json file and add your token in the space provided`);
    return;
}
const {token,SUdebugMode} = require("./config.json");

//Discord partials, still need to use these
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"],});
client.commands = new Discord.Collection();

//reads files
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//cooldowns
const cooldowns = new Discord.Collection();

//Method used to fetch the Nickname of a user, or their username if they do not have a Nickname
const displayName = (message) => {
    const dispName = message.member.nickname;
    return dispName === null ? message.author.username : dispName;
};

//init Unique Server Settings (loads contents of settings.json into settings var)
var settings = {};
if (fs.existsSync("settings.json")) {
    settings = jsonfile.readFileSync("settings.json");
}

//init user levels (loads contents of levels.json into stats var)
var stats = {};
if (fs.existsSync("levels.json")) {
    stats = jsonfile.readFileSync("levels.json");
}

//sets bot status and logs ready
client.once("ready", () => {
    client.user.setStatus("available");
    client.user.setActivity(`for ${client.guilds.cache.size} servers!`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/furSUDO",
    });
    console.log("Ready!");
});

client.on("guildCreate", (guild) => {
    //creates settings for bot on join
    settings[guild.id] = {
        nsfw: 0,
        leveling: 0,
        botUpdates: 0,
        prefix: "su!",
    };
    fs.writeFileSync("settings.json", settings);
});

//logs when a new member joins a guild, this is for testing purposes
client.on("guildMemberAdd", (member) => {
    if (SUdebugMode) console.log(`New User "${member.user.username}" has joined "${member.guild.name}"`);
});

//start of main method
client.on("message", async (message) => {
    if (message.author.bot) return;
    //creates entry for server ID if it did not already exist
    if (!(message.guild.id in settings)) {
        settings[message.guild.id] = {
            nsfw: 0,
            leveling: 0,
            botUpdates: 0,
            prefix: "su!",
        };
        jsonfile.writeFileSync("settings.json", settings);
    }

    // Reads file again because I have no clue why it didn't work otherwise but
    // this seems to fix the issue therefore I am going to leave it in and not
    // attempt to fix it otherwise, but maybe if you are reading this and have
    // big brain you can suggest a fix idk lol
    settings = jsonfile.readFileSync("settings.json");

    const guildSettings = settings[message.guild.id];
    const prefix = guildSettings.prefix;

    //if message does not start with the prefix, execute level module, else execute command
    if (!message.content.startsWith(prefix) && guildSettings.leveling === 1) {
        if (message.guild.id in stats === false) {
            stats[message.guild.id] = {};
        }
        const guildStats = stats[message.guild.id];

        if (!(message.author.id in guildStats)) {
            guildStats[message.author.id] = {
                xp: 0,
                level: 0,
                last_message: 0,
                background: 0,
            };
        }

        const userStats = guildStats[message.author.id];
        if (Date.now() - userStats.last_message > 60000) {
            userStats.xp += Math.floor(Math.random() * 7) + 8;
            userStats.last_message = Date.now();

            const xpToNextLevel =
                5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
            if (userStats.xp >= xpToNextLevel) {
                userStats.level++;
                userStats.xp = userStats.xp - xpToNextLevel;
                message.channel.send(`${displayName(message)} has reached level ${userStats.level}`);
                //sends a gif if user reaches level 69
                if (userStats.level === 69) message.channel.send(`https://tenor.com/view/nice-gif-10653491`)
            }

            if (SUdebugMode) console.log(`${displayName(message)} now has ${userStats.xp}\n${xpToNextLevel} needed to lvl up\nMessage: ${message.content}`);
        }
        jsonfile.writeFileSync("levels.json", stats);

        return;
    }
    //Logs message (for testing purposes)
    if (SUdebugMode) console.log(`${displayName.message}: ${message.content}`);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;
    //If command is marked as guildOnly, it will not work in DMs
    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }
    //If command is marked that it is adminOnly, only members with the BAN_MEMBERS permission can run the command
    if (command.adminOnly && !message.member.hasPermission("BAN_MEMBERS")) {
        let reply = `You have insufficient permissions to run this command!`;
        return message.reply(reply);
    }
    //If command is marked that it needs arguments, this will alert user to that fact
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    //If command has cooldown, this will enforce cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //This executes the command
    try {
        command.execute(message, args, prefix, settings);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});

client.login(token);