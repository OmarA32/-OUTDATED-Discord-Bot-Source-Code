const Discord = require('discord.js');



function coin() {
    var rand = [
     "HEADS",
     "TAILS"
      ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}




module.exports = {
  name: "c",
    description: "coin",

    

    async run (client, message, args) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
      try{
      

      

      message.channel.send(coin());
    
        }catch(e){
      return;
    }
      
    }
    
     
}


module.exports.config = {
    name: "c",
    timeout: 1000,
    aliases: ['coin', 'flipcoin']
}