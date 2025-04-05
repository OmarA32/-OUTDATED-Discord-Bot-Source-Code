const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
   if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      functions.embedbuilder(client, message, "#c219d8", "VOLUME!", `changed volume to \`${args[0]} %\``).then(msg => msg.delete({ timeout: 5000 }).catch(console.error));
      
      await client.distube.setVolume(message, args[0]);
      
      await functions.delay(5000);
      return;
      }catch(e){
        return;
      }
}

module.exports.config = {
    name: "volume",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['vol']
}