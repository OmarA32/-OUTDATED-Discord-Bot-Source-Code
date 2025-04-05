const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
  if (!message.member.voice.channel) return message.channel.send("You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      await functions.embedbuilder(client, message, "#c219d8", `Autoplay is now on ${client.distube.toggleAutoplay(message) ? "ON" : "OFF"}!`)

      
      return;
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "autoplay",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['ap']
}