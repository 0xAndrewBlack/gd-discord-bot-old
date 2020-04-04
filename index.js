const { prefix, token } = require("./config.js");
const { orak } = require("./orak.js");
const classes = require("./classes.js");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();
const CronJob = require("cron").CronJob;
const cron = require("node-cron");

const now = new Date();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/classes", function(req, res) {
  res
    .status("200")
    .send("Classes: *")
    .json();
});
app.get("/classes/:id", function(req, res) {
  const query = req.params.id;
  if (query < classes.length) {
    res.status(200).json(classes[query]);
  } else {
    res.status(404).json("Class with ID:" + query + " not found!");
  }
});

app.use(function(req, res, next) {
  var err = new Error("Nem található!");
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

client.once("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity("Pihen", {
    type: "PLAYING"
  });
  console.log("BOT is ready!");
});

client.on("ready", () => {
  const channel = client.channels.cache.find(ch => ch.name === "bot-dev");
  console.log(`Órarend: ${Object.keys(orak)}`);
  console.log(`Órarend első nap: ${Object.keys(orak[1])}`);
  console.log(`Órarend elsőnap első órája: ${orak[1][1].ora}`);
  console.log(
    `Órarend elsőnap első óra kezdése: ${orak[1][1].k_ora}:${orak[1][1].k_perc}`
  );

  job = new CronJob(
    `* ${orak[1][1].k_perc} ${orak[1][1].k_ora} * * ${orak[1][1].nap}`,
    () => {
      console.log(`${orak[1][1].ora} óra van!`);
      channel.send(`${orak[1][1].ora} óra van!`);
      job.stop();
    },
    null,
    true
  );
  job.start();
});

client.on("message", msg => {
  const ch = msg.channel.name == "bot";
  const mbrole = msg.member.roles.cache.some(role => role.name === "Diák");

  if (ch && mbrole) {
    if (msg.content.startsWith(prefix + "clearchat")) {
      console.log(`Chat törlés by ${msg.author.name}`);
      async function clear() {
        let fetched;
        msg.delete();
        fetched = await msg.channel.messages.fetch({ limit: 10 });
        msg.channel.bulkDelete(fetched);
      }
      clear();
    } else {
      console.log("Nem szabad");
    }
  }
  console.log(`[LOG] ${msg.author.username}: ${msg.content}`);
});

client.login(token);
app.listen(PORT, () => console.log("Web server & API is running."));
