![SUDOku](https://github.com/furSUDO/SUDOku/blob/master/github/logo.png?raw=true) 
---
[![Language](https://img.shields.io/badge/JavaScript-purple.svg?style=plastic&colorB=ff4e4e)]()
[![License](https://img.shields.io/github/license/furSUDO/SUDOku.svg?style=plastic&colorB=7288da)]()
[![Release](https://img.shields.io/github/release/furSUDO/SUDOku.svg?style=plastic&colorB=ffffff)]()

SUDOku is a general purpose discord bot for furries

_You can invite SUDOku to your server by clicking on [this link!](https://discord.com/oauth2/authorize?client_id=612745923575021573&scope=bot&permissions=8)_

## Commands
![SUDOku Commands](https://github.com/furSUDO/SUDOku/blob/master/github/commands.png?raw=true)
As SUDOku is still in active development, new commands are added all the time, however you may not be able to view some of them, because they are secret ;p

Here is a list of active commands
### General commands
| command | usage | description | aliases |
|---------|-------|-------------|---------|
| prefix  |``su!prefix``|changes the prefix of the bot|
| module  | ``su!module enable/disable {module name}`` | Enable/Disable the NSFW, leveling and Bot Updates module |
### Leveling Commands
to use the leveling commands, make sure to run ``su!module enable leveling`` in your server!
| command | aliases | usage | description |
|---------|---------|-------|-------------|
|profile|``na``|``su!profile``|Displays the user's server level|
|setbackground|``setprofile``|``su!setbackground {number between 0 and 15}``|Allows the user to customize their background|
### e621 and e926 commands



## SUDOku is open source... kinda?

While the main code is fully downloadable and editable, things like commands stay a secret

## Running your own version of SUDOku

Running your own version, or using SUDOku as a base discord bot is as easy as cloning the repository, or downloading it as a zip

before we begin, make sure you have node installed on your system, you can check if you do by running ``node -v`` in the command line

once you have the main files installed run:
```
npm i
```
This will install all the dependencies that SUDOku needs

when all the dependencies have installed, run: ```node .``` to run the project. The first time you run ``node .`` you will be asked to edit the newly generated ``config.json`` file. 

In this file you will need to replace the token key with your bot token, which can be found [here](https://discord.com/developers/applications).
   


## Todo
- [X] Make repo public
- [X] write README.md file
- [ ] add more commands 

Pull requests are more than welcomed!

## License
Usage is provided under the [MIT License](http://http//opensource.org/licenses/mit-license.php). See LICENSE for the full details.
