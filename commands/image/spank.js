const Discord = require("discord.js");
const canvacord = require("canvacord");
const botsettings = require('../../botsetting.json');



module.exports.run = async (client, message, args) => {
 
      
   let member = message.mentions.users.first();
   let author = message.author;
   if(!member) return message.channel.send("You must tag someone.");

   else if (member){
     if(member === author) return message.channel.send("noo whyyyy!")
     else if(member !== author){

   let avataruser = author.displayAvatarURL({ dynamic: false, format: 'png' });
   let avatarmember = member.displayAvatarURL({ dynamic: false, format: 'png' });
       
        let m = await message.channel.send("**Working on it....**")
       let image = await canvacord.Canvas.spank(avataruser, avatarmember);
       let attachment = new Discord.MessageAttachment(image, "spank.png");
      return message.channel.send(attachment).then(m.delete())
      
       }

       }
       
    
    
}

module.exports.config = {
    name: "spank",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 4000,
    aliases: []
}