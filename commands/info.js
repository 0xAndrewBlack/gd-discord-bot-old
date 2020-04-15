const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "info",
  description: "Get every information about the server and the bot.",
  execute(msg, args) {
    //const server_name = msg.guilds.cache.size;
    //const server_size = client.guilds.cache.array().sort();
    const server_dev = client.guilds.cache.size;

    const embedInfo = new Discord.MessageEmbed()
      .setColor("#226699")
      .setTitle(`Server Name: ${server_dev}`)
      .setDescription(`Size: 0`)
      .setTimestamp()
      .setFooter("GD Discord BOT (c) Andrew Black");

    msg.channel.send(embedInfo);
  },
};
