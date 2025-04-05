const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
  if (!message.member.voice.channel) return message.channel.send("You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

    

    await message.guild.me.voice.channel.leave()
    
    
     return message.channel.send(`🔌 **Successfully left VC**`) ;

     

     
    }catch(e){
      console.log(e)
      return;
    }
}

module.exports.config = {
    name: "stop",
    timeout: 1500,
    aliases: ['leave', 'disconnect', 'fuckoff']
}