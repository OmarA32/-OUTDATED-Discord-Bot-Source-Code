const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args) => {
  try{
if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      let queue = client.distube.getQueue(message);
      if (!queue) return functions.embedbuilder(client, message, "RED", "There is nothing playing!")

      let cursong = queue.songs[0];

      return functions.embedbuilder(client, message, "#c219d8", "Current Song!", `[${cursong.name}](${cursong.url})\n\nRequested by: ${cursong.user}\n\nPlaying for: \`${(Math.floor(queue.currentTime / 1000 / 60 * 100) / 100).toString().replace(".", ":")} Minutes\`\n\nDuration: \`${cursong.formattedDuration}\``, cursong.thumbnail)
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "nowplaying",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['np']
}