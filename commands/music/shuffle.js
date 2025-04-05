const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
    if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      functions.embedbuilder(client, message, "#c219d8", "Shuffled!")
      return client.distube.shuffle(message);
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "shuffle",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['mix']
}