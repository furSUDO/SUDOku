const { ShardingManager } = require('discord.js');
const fs = require("fs");
const jsonfile = require("jsonfile");
var config = {};
if (!fs.existsSync("config.json")) {
    config = {token:"your token here",SUdebugMode:false};
    jsonfile.writeFileSync("config.json", config);
    console.log(`You have started the bot for the first time, please edit the config.json file and add your token in the space provided`);
    return;
}
const {token} = require("./config.json");
const manager = new ShardingManager('./bot.js', {token: `${token}`});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();