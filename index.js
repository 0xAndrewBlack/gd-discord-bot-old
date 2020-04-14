const fs = require("fs");
const { prefix, token } = require("./config.js");
const orak = require("./orak.js");
const classes = require("./classes.js");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const schedule = require("node-schedule");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

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
  if (query < classes.length) {
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
  const rule = new schedule.RecurrenceRule();

  rule.hour = 13;
  rule.minute = 42;

  //console.log(rule.nextInvocationDate());

  const j = schedule.scheduleJob(rule, function () {
    console.log("The answer to life, the universe, and everything!");
  });
});

client.on("message", (msg) => {
  console.log(`[LOG] ${msg.author.username}: ${msg.content}`);

  let args = msg.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  const mbrole = msg.member.roles.cache.some((role) => role.name === "Diák");
  const ch = msg.channel.name == "bot-dev" || "bot";

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    //console.error(error);
    msg.channel.send("Command not executed or implemented nor found!");
  }
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.login(token);
app.listen(PORT, () => console.log("Web server & API is running."));
