const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      let queue = client.distube.getQueue(message);
      if (!queue) return functions.embedbuilder(client, message, "RED", "There is nothing playing!").then(msg => msg.delete({ timeout: 5000 }).catch(console.error));

      const status = `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "❌"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
      return functions.embedbuilder(client, message, "#c219d8", "Current status:", status)
    }catch(e){
      return;
    }
}

module.exports.config = {
    name: "status",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}