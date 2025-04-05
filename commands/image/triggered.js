const botsettings = require('../../botsetting.json');
const Discord = require("discord.js");
const canvacord = require("canvacord");




module.exports.run = async (client, message, args) => {
    try{
      
   let member = message.mentions.users.first() || message.author;

   let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
       
        let m = await message.channel.send("**Working on it....**")
       let image = await canvacord.Canvas.trigger(avatar);
       let attachment = new Discord.MessageAttachment(image, "triggered.gif");
      return message.channel.send(attachment).then(m.delete())
      
    }catch(e){
      return;
    }
    
}

module.exports.config = {
    name: "triggered",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 4000,
    aliases: []
}