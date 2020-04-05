const { prefix, token } = require("./config.js");
const orak = require("./orak.js");
const classes = require("./orak.js");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const CronJob = require("cron").CronJob;

const client = new Discord.Client();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/classes", function (req, res) {
  res.status("200").send("Classes: *").json();
});
app.get("/classes/:id", function (req, res) {
  const query = req.params.id;
  if (query < orak.length) {
    res.status(200).json(classes[query]);
  } else {
    res.status(404).json("Class with ID:" + query + " not found!");
  }
});

app.use(function (req, res, next) {
  var err = new Error("Nem található!");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

client.once("ready", () => {
  client.user.setStatus("idle");
  client.user.setActivity("Pihen", {
    type: "PLAYING",
  });
  console.log("BOT is ready!");
});

client.on("ready", () => {
  const channel = client.channels.cache.find((ch) => ch.name === "bot-dev");
  /* Implement Timetable API Check */
});

client.on("message", (msg) => {
  const ch = msg.channel.name == "bot-dev" || "bot";
  const mbrole = msg.member.roles.cache.some((role) => role.name === "Diák");

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

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.login(token);
app.listen(PORT, () => console.log("Web server & API is running."));
