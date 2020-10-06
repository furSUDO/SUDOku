
## Commands
![SUDOku Commands](https://github.com/furSUDO/SUDOku/blob/master/github/commands.png?raw=true)
You are unable to view the commands, because they are mah secrets ;p

however! This is how you can build your own:

```javascript
module.exports = {
	name: 'nameOfCommand',
	description: 'Your name and filename should be the same',
    args: true,
	adminOnly: true,
	async execute(message) {
		message.channel.send(`First argument: ${args[0]}`);
	},
};
```