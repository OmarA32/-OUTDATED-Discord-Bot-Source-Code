const Discord = require("discord.js");
const canvacord = require("canvacord");
const botsettings = require('../../botsetting.json');



module.exports.run = async (client, message, args) => {
    try{
   let member = message.mentions.users.first() || message.author;

   let avatar = member.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });
       
        let m = await message.channel.send("**Working on it....**")
       let image = await canvacord.Canvas.wanted(avatar);
       let attachment = new Discord.MessageAttachment(image, "wanted.png");
      return message.channel.send(attachment).then(m.delete())
    }catch(e){
      return;
    }
      
    
    
}

module.exports.config = {
    name: "wanted",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 4000,
    aliases: []
}