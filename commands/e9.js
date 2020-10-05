const fs = require('fs');
const { Guild } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const jsonfile = require ('jsonfile');

module.exports = {
	name: 'e9',
	description: 'Displays an image from e926.net matching your query',
	cooldown: 2,
	execute(message, args) {   
    var searchq = `${args}`.replace(/,/g, "+");
    var title = `${args}`.replace(/, /g, " ")
    //API Fetch
    async function getFile(q){//function to fetch player id from name
        var url = `https://e926.net/posts.json?tags=${q}&limit=1&page=${i}`;
        const api_response = await fetch(url, {method  : 'GET', headers : {"User-Agent"   : "SUDOkuBot/0.0.1"} });
        const file = await api_response.json();
        return {ext, size, url} = file.posts[0].file;
    }
    async function getScore(q){//function to fetch player id from name
        var url = `https://e926.net/posts.json?tags=${q}&limit=1&page=${i}`;
        const api_response = await fetch(url, {method  : 'GET', headers : {"User-Agent"   : "SUDOkuBot/0.0.1"} });
        const score = await api_response.json();
        return {up, down} = score.posts[0].score;
    }
    async function getArtist(q){//function to fetch player id from name
        var url = `https://e926.net/posts.json?tags=${q}&limit=1&page=${i}`;
        const api_response = await fetch(url, {method  : 'GET', headers : {"User-Agent"   : "SUDOkuBot/0.0.1"} });
        const artist = await api_response.json();
        return artist.posts[0].tags.artist[0];
    }
    //End of API Fetching
    var i = Math.floor(Math.random() * 100);
    let file = getFile(searchq);
        file.then(function(file){
            let score = getScore(searchq);
                score.then(function(score){
                    let artist = getArtist(searchq);
                        artist.then(function(artist){
                            const exampleEmbed = new Discord.MessageEmbed()
                                .setColor('#00539f')
                                .setTitle("e926 search for tag(s) "+title)
                                .setImage(file.url)
                                .setAuthor('e926 Discord Browser')
                                .setThumbnail('https://e926.net//apple-touch-icon.png')
                                .addFields(
                                    { name: 'Score', value: `<:up:722085960703279254>: _${score.up}_\n<:down:722085972262781331>: _${score.down}_`},
                                    { name: 'Artist', value: `${artist}`},
                                )
                                .setTimestamp()
                                .setFooter('Made by SUDO#4072', 'https://cdn.discordapp.com/attachments/756644176795533334/761154213019254784/WOBBLY_ICON_BASE.gif');
                                
                                message.channel.send(exampleEmbed);
                                
                        });
                });
        });
    } 
}