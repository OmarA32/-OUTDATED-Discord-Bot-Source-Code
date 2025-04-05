const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
  const someEmoji = client.emojis.cache.get('851560368644161536');
  
  if(message.guild.me.voice.channel){


        if (!message.member.voice.channel) return message.channel.send("You must join my Voice Channel!")

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send("I am not allowed to \`speak\` in your Channel")

        const messageArray = message.content.split(' ');
        const args2 = messageArray.slice(1);

        const music = args2.join(" ");
        if (!music)return message.channel.send("Add a song to play or type the name of it!")

    
    
    
    //if not allowed to CONNECT to the CHANNEL
    

        

        message.channel.send(`${someEmoji} **Searching** 🔍 \`${music}\``)

      return client.distube.play(message, music)
  
    
    
  

    }else if(!message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join a Voice Channel")
        
         

        

         

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT"))return message.channel.send("I am not allowed to \`join\` your Channel")

        message.channel.send(`👍 **joined** \`${message.member.voice.channel.name}\``).then(message.member.voice.channel.join())

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send("I am not allowed to \`speak\` in your Channel")

        const messageArray = message.content.split(' ');
        const args2 = messageArray.slice(1);

        const music = args2.join(" ");
        if (!music)return message.channel.send("Add a song to play or type the name of it!")

        message.channel.send(`${someEmoji} **Searching** 🔍 \`${music}\``)

      return client.distube.play(message, music)
      }
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "play",
    timeout: 1000,
    aliases: ['p']
}