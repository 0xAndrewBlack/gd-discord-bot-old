const { prefix, token } = require("./config.js");
const Discord = require("discord.js");
const client = new Discord.Client();

const date = require("date-and-time");
const { orak } = require("./orak.js");

const channel = client.channels.cache.find(ch => ch.name === "tantargy");
const pattern = date.compile("HH:mm");
const now = new Date();
date.format(now, pattern);

client.once("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity("Pihen", {
    type: "PLAYING"
  });
  console.log("BOT is ready!");
});

client.on("ready", () => {
  const oranap = orak[0];
  const oraora = orak[1][1].ora;
  const oracsop = orak[1][1].csoport;
  const orakezdes = orak[1][1].kezdodik;
  const mainap = now.getDay().toLocaleString();
  const most = `${now.getHours()}:${now.getMinutes()}`;

  if (mainap != oranap && orakezdes != most) {
    console.log(
      `Nap: ${mainap}, Csop.: ${oracsop}, Óra: ${oraora}, Kezdődik: ${orakezdes}, Dev: ${most}`
    );
  }

  setInterval(() => {
    if (mainap == orak[1][1]) {
      console.log("Hétfő yee");
    } else if (mainap == 2) {
      console.log("Kedd yee");
    } else if (mainap == 3) {
      console.log("Szerda yee");
    } else if (mainap == 4) {
      console.log("Csütörtök yee");
    } else if (mainap == 5) {
      console.log("Péntek yee");
    }
  }, 5000);
});

client.on("message", msg => {
  console.log(`[LOG] ${msg.author.username}: ${msg.content}`);
});

client.login(token);
