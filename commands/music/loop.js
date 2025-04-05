const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args) => {
try{
if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
        await client.distube.setRepeatMode(message, parseInt(args[0]));
        

        await functions.embedbuilder(client, message, "#c219d8", "Repeat mode set to:", `${args[0].replace("0", "OFF").replace("1", "Repeat this song only!").replace("2", "Repeat all Queue!")}`)
        return
      }
      else {
        return functions.embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
      }
    }catch(e){
      return;
    }
}

module.exports.config = {
    name: "loop",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 2000,
    aliases: ['repeat']
}