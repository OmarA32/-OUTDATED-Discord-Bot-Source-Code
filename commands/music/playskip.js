const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
    if(message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join my Voice Channel!")

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

        const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);
     
      functions.embedbuilder(client, message, "#c219d8", "Searching and Skipping!", args2.join(" "))
     
      return client.distube.playSkip(message, args2.join(" "));



    }else if(!message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join a Voice Channel!")

        const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);
     
      functions.embedbuilder(client, message, "#c219d8", "Searching and Skipping!", args2.join(" "))
     
      return client.distube.playSkip(message, args2.join(" "));
    }
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "playskip",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ['ps']
}