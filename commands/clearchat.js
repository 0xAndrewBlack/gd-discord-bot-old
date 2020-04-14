module.exports = {
  name: "clearchat",
  description: "Removes message by n",
  execute(msg, args) {
    console.log(`Chat törlés by ${msg.author}`);
    if (isFinite(args)) {
      if (Number(args) <= 25) {
        async function clear() {
          msg.delete();
          let fetched = await msg.channel.messages.fetch({ limit: args });
          msg.channel.bulkDelete(fetched);
        }
        clear();
      } else {
        msg.reply("Csak 25db-ot törölhetsz!");
      }
    }
  },
};
