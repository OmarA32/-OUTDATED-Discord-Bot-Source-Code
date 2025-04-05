const botsettings = require('../../botsetting.json');
const functions = require("../../functions");
const DisTube = require('distube');

module.exports.run = async (client, message, args) => {
  try{
if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)


      let queue = client.distube.getQueue(message);
      if (!queue) return functions.embedbuilder(client, message, "RED", "There is nothing playing!").then(msg => msg.delete({ timeout: 5000 }).catch(console.error));

      if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
        functions.embedbuilder(client, message, "RED", "ERROR", `Jumped ${parseInt(args[0])} songs!`)
        
        return client.distube.jump(message, parseInt(args[0]))
          .catch(err => message.channel.send("Invalid song number."));
      }
      else {
        return functions.embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
      }
    }catch(e){
      return;
    }
}

module.exports.config = {
    name: "jump",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}