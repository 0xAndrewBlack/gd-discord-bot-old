module.exports = {
  name: "reload",
  description: "Reloads a command",
  execute(client, msg, args) {
    /*const commandName = args[0].toLowerCase();
    const command =
      msg.client.commands.get(commandName) ||
      msg.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      return msg.channel.send(
        `There is no command with name or alias \`${commandName}\`, ${msg.author}!`
      );
    }

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      msg.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.log(error);
      return msg.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
    msg.channel.send(`Command \`${command.name}\` was reloaded!`);*/
  },
};
