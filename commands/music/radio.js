const radio = require("../../radio");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args, prefix) => {
  try{
 if(message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join my Voice Channel!")

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send("I am not allowed to \`speak\` in your Channel")



      return radio(client, message, args, prefix).catch((e) => console.log(e));

      }else if(!message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join my Voice Channel!")


        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send("I am not allowed to \`speak\` in your Channel")

         return radio(client, message, args, prefix).catch((e) => console.log(e));
      }
  }catch(e){
    console.log(e)
    return;
  }
}

module.exports.config = {
    name: "radio",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}