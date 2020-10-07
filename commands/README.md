
# Commands
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

## execute function parameters
The `execute()` function can take up to 4 parameters in this order:
1. `message`: the message object
2. `args`: a `list` containing every word in the original message excluding the prefix
3. `prefix`: the prefix of the server where the message came from
4. `settings`: the `object` with all the servers' settings

**BEWARE**: For how JavaScript works, if you pass a primitive to a function and assign a new value to it, the value on the caller will not change. Passing an `object` and adding, removing or in general modifying that object will result in the changes being applied to the state of the original object. [Click here for more information](https://www.w3schools.com/js/js_function_parameters.asp).  

## Changing the settings from a command
To edit a server's settings from a command, as for example to change a server's specific prefix, you can edit the settings object passed in as a parameter to the execute function.  
Remember that to make those changes **permanent** you need to save them to the `settings.json` file in the root folder.