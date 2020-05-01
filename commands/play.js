const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Plays a youtube video from the link provided.",
  execute(client, msg, args) {
    const streamOptions = { seek: 0, volume: 1 };
    const url = args[0];
    if (msg.member.voice.channel) {
      console.log(`Playing: ${url} by ${msg.author.username}`);
      msg.member.voice.channel
        .join()
        .then((connection) => {
          const stream = ytdl(url, { type: "opus", filter: "audioonly" });
          const dispatcher = connection.play(stream, streamOptions);
          dispatcher.on("end", (end) => {
            message.member.voiceChannel.leave();
          });
        })
        .catch((e) => console.log(e));
    }
  },
};
