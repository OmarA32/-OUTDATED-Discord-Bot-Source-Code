const botsettings = require('../../botsetting.json');
const Discord = require("discord.js");
const canvacord = require("canvacord");




module.exports.run = async (client, message, args) => {
    try{
      


       
    let member = message.mentions.users.first() || message.author;

   let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
       
        let m = await message.channel.send("**Working on it....**")
       let image = await canvacord.Canvas.facepalm(avatar);
       let attachment = new Discord.MessageAttachment(image, "facepalm.png");
      return message.channel.send(attachment).then(m.delete())
      
    }catch(e){
      return;
    }
    
}

module.exports.config = {
    name: "facepalm",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 3000,
    aliases: []
}

