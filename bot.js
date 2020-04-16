const fs = require("fs");
const { prefix, token, ch_name } = require("./config.js");
const Discord = require("discord.js");
const schedule = require("node-schedule");

const lessons = require("./resources/lessons.js");
const classes = require("./resources/classes.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity("Pihen.", {
    type: "PLAYING",
  });
  console.log("BOT is ready!");
});

client.on("ready", () => {
  const ch = client.channels.cache.find((ch) => ch.name === ch_name);
  const rule = new schedule.RecurrenceRule();
  for (let i = 1; i <= Object.keys(lessons).length; i++) {
    for (let j = 1; j <= Object.keys(lessons[i]).length; j++) {
      rule.tz = "UTC+2";
      rule.dayOfWeek = i;
      rule.hour = lessons[i][j].k_ora;
      rule.minute = Number(lessons[i][j].k_perc) - 5;

      const ido = `${lessons[i][j].k_ora}:${lessons[i][j].k_perc}`;
      const ora = lessons[i][j].ora;
      const link = lessons[i][j].link;
      const kep_logo = client.user.displayAvatarURL({
        format: "png",
        dynamic: true,
      });

      const embed_csop = new Discord.MessageEmbed()
        .setColor("#226699")
        .setTitle(`${ora} lesz!`)
        .setURL(link)
        .setThumbnail(kep_logo)
        .setDescription(`${ido}-kor! \nNe késsetek ;)`)
        .setFooter("GD Discord BOT (c) Andrew Black");

      const job = schedule.scheduleJob(rule, function () {
        if (lessons[i][j].csoport === 3) {
          ch.send("<@&693739523242459146> <@&693739662581301250>");
          ch.send(embed_csop);
        } else if (lessons[i][j].csoport === 2) {
          ch.send("<@&693739662581301250>");
          ch.send(embed_csop);
        } else {
          ch.send("<@&693739523242459146>");
          ch.send(embed_csop);
        }
      });
    }
  }
});

client.on("message", (msg) => {
  console.log(`[LOG] ${msg.author.username}: ${msg.content}`);

  let args = msg.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    msg.channel.send("Command not executed or implemented nor found!");
  }
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.login(token);
