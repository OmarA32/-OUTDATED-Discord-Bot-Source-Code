const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
   if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      
      
      let isdone = await client.player.seek(message, parseInt(message.args[0] * 1000)).catch(err => {
            return message.channel.send(error.message);
        });
        if (isdone){
      await functions.embedbuilder(client, message, "#c219d8", "cleared!", `Queue was cleared!`)
        }else return message.channel.send("Nothing is playing!")
     

      return;
      }catch(e){
        return;
      }
}

module.exports.config = {
    name: "seek",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}