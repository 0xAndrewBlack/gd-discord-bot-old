module.exports = {
  name: "devcmd",
  description: "Development Test Command",
  execute(client, msg, args) {
    return msg.channel.send(
      "``#" + Math.floor(Math.random() * 16777215).toString(16) + "``"
    );
  },
};
