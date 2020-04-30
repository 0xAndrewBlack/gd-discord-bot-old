const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Plays a youtube video from the link provided.",
  execute(client, msg, args) {
    const streamOptions = { seek: 0, volume: 1 };
    if (msg.member.voice.channel) {
      const url = "https://www.youtube.com/watch?v=xC2Wqquui6E"; //args[0].toLowerCase();
      console.log(url);
      msg.member.voice.channel
        .join()
        .then((connection) => {
          console.log("JOINED.");
          console.log(url);
          const stream = ytdl(url, { type: "opus", filter: "audioonly" });
          stream.on("error", console.error);
          const dispatcher = connection.play(stream, streamOptions);
          dispatcher.on("end", (end) => {
            console.log("LEFT.");
            message.member.voiceChannel.leave();
          });
        })
        .catch((e) => console.log(e));
    }
  },
};
