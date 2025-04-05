const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas');

module.exports.run = async (client, message, args) => {
  try{
  let m = await message.channel.send("**Working on it....**");

  
  if (message.attachments.size > 0){
    
    let user = message.author;

    const messageAttachment = await message.attachments.first().proxyURL;
    const nameArray = messageAttachment.split('.');
    const attEx = nameArray[nameArray.length - 1];
    
    if (attEx == "png" || attEx =="jpeg" || attEx =="jpg" || attEx =="gif"){

    const image = await loadImage(messageAttachment);

    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext("2d");
    const background = await loadImage("./././whatsapp.png");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_whatsapp.jpg`
    );
    message.channel.send(attachment).then(m.delete())

    } else {

      return message.channel.send(`You can only use this command for: (\`png, jpg, jpeg, gif\`) files.`);

    }

  }else{

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) ||
      message.author;

    const avatar = await loadImage(
      user.displayAvatarURL({ format: "png" })
    );
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext("2d");
    const background = await loadImage("./././whatsapp.png");
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_whatsapp.jpg`
    );
    message.channel.send(attachment).then({
              if(m){
               m.delete()
              } 
              });

  }
  }catch(e){
    console.log(e)
    return;
  }
  
}

module.exports.config = {
    name: "whatsapp",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 4000,
    aliases: []
}