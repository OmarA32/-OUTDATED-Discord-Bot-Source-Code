const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');



function bigbossgifs() {
    var rand = [
        "https://i.pinimg.com/originals/5e/08/26/5e082629284c53812f68e322b6111133.gif",

        "https://1.bp.blogspot.com/-7SFfb_wYU40/XQpOPVmOg_I/AAAAAAAAAVE/3ve3catVQnE1_GyL5OjXuuxmAHunQSQpACLcBGAs/s1600/TiredSecondaryIceblueredtopzebra%2B%25281%2529.gif",

        "https://i.gifer.com/1SyD.gif",

        "https://thumbs.gfycat.com/EmbarrassedThunderousArmyant-max-1mb.gif",

        "https://thumbs.gfycat.com/LoneConsciousBrahmanbull-max-1mb.gif",

        "http://i.imgur.com/9lbk2O5.gif",

        "http://24.media.tumblr.com/7115ae4aca86099a771efb7e9b69f968/tumblr_n1zdplYqzt1srudz4o1_250.gif",

        "https://i.makeagif.com/media/8-10-2015/4YW39q.gif",

        
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

module.exports = {
  name: "big boss",
    description: "big boss",
     
    async run (client, message, args) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

      try{
      
      const bigboss = new Discord.MessageEmbed()
        .setImage(bigbossgifs())
        .setColor('#985ce7')


      message.channel.send(bigboss);
      }catch(e){
      return;
    }
   
    }
    
}

module.exports.config = {
    name: "big boss",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["bb", "bigboss"]
}