const Discord = require("discord.js");
const client = new Discord.Client();
const canvacord = require("canvacord");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
 
    let member = message.mentions.users.first();
    let author = message.author;




  if (!member){
    
      let contentuser = args.slice(0).join(' ');
      if(!contentuser) return message.channel.send("add a text, or a user then a text after.");

   let m = await message.channel.send("**Working on it....**")
    let avatarauthor = author.displayAvatarURL({dynamic : false, format : 'png'});

    let image = await canvacord.Canvas.youtube({
      username : author.username,
      content : contentuser,
      avatar: avatarauthor,
      dark: true
    })

   
    let attachment = new Discord.MessageAttachment(image, "comment.png");
    
    return message.channel.send(attachment).then(m.delete())



    }
    else if (member){
    let contentuser = args.slice(1).join(' ');
      if(!contentuser) return message.channel.send("add a text.");

     let m = await message.channel.send("**Working on it....**")
      let avatarmember = member.displayAvatarURL({dynamic : false, format : 'png'});

    let image = await canvacord.Canvas.youtube({
      username : member.username,
      content : contentuser,
      avatar: avatarmember,
      dark: true
    })

    
    let attachment = new Discord.MessageAttachment(image, "comment.png");
    return message.channel.send(attachment).then(m.delete())

    }
   
  
    
  
}


module.exports.config = {
    name: "comment",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 3000,
    aliases: ['youtube']
}