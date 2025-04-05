const db = require('quick.db');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');




module.exports.run = async (client, message, args) => {
  var filters = ["mcompand", "gate", "haas", "pulsator", "surrounding", "clear", "8d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "subboost", "phaser", "tremolo", "vibrato", "reverse", "purebass", "treble"];
 

  const effect = args[0];

  if (!effect)return message.channel.send(`you must add a valid filter name to use!`)

  if(filters.includes(effect)){ 

  try{
    
      if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

      let filter = await client.distube.setFilter(message, effect);
     
      await functions.embedbuilder(client, message, "#c219d8", "Adding filter!", filter).then(msg => msg.delete({ timeout: 5000 }).catch(e => console.log(e)));
      
  
    }catch(e){
      return;
    }

 } else {
 return message.channel.send(`enter a valid filter/effect.`)
 }
}


module.exports.config = {
    name: "filter",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['f']
}