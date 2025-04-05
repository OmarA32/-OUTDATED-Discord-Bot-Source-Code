const Discord = require("discord.js");
const botsettings = require('../../botsetting.json');

const canvacord = require("canvacord");


module.exports.run = async (client, message, args) => {

  const messageArray = message.content.split(' ');
  const args2 = messageArray.slice(1);

    let member = message.mentions.users.first();
    let content = args2.slice(1).join(' ');



  if(!member)return message.channel.send("You must tag someone!")
  if(!content) return message.channel.send("You must add a text!")

  

  else if (member){
  let m = await message.channel.send("**Working on it....**")
    let avatar = member.displayAvatarURL({dynamic : false, format : 'png'});

    let image = await canvacord.Canvas.quote({
      username : member.username,
      message : content,
      image: avatar

    })

      
       let attachment = new Discord.MessageAttachment(image, "wanted.png");
      return message.channel.send(attachment).then(m.delete())
    
  }
}
  



module.exports.config = {
    name: "quote",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 3000,
    aliases: ["quote"]
}