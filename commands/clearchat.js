module.exports = {
  name: "clearchat",
  description: "Removes message by n",
  execute(client, msg, args) {
    console.log(`[LOG] Chat törlés by ${msg.author}`);
    if (isFinite(args) && args.length > 0) {
      if (Number(args) <= 25) {
        const del_limit = Number(args) + 1;
        async function clear() {
          msg.delete();
          let fetched = await msg.channel.messages.fetch({ limit: del_limit });
          msg.channel.bulkDelete(fetched);
        }
        clear();
      } else {
        msg.reply("Csak 25db-ot törölhetsz!");
      }
    } else {
      msg.channel.send("You didn't provide any args");
    }
  },
};
