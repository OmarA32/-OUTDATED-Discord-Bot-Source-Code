const Discord = require("discord.js");
const canvacord = require("canvacord");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args) => {
    try{
        const messageArray = message.content.split(' ');
        const args2 = messageArray.slice(1);

         let text = args2.join(" ");

        if(!args[0]) return message.channel.send('Provide a valid text');
  
       
        let m = await message.channel.send("**Working on it....**")
       let image = await canvacord.Canvas.ohno(text);
       let attachment = new Discord.MessageAttachment(image, "ohno.png");
      return message.channel.send(attachment).then(m.delete())
      
    }catch(e){
      return;
    }
    
}

module.exports.config = {
    name: "ohno",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 4000,
    aliases: []
}

