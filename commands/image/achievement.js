const Canvas = require('canvas');
const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
           const messageArray = message.content.split(' ');
           const args2 = messageArray.slice(1);

           const fullMessageArgs = args2.join(' ');

            if (!fullMessageArgs) return message.channel.send("You need to type a text after the command!");


            let m = await message.channel.send("**Working on it....**")

            
            const canvas = Canvas.createCanvas(512, 126);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('./././ach.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '10px #74037b';
            ctx.font = '25px sans-serif';
            ctx.fillStyle = '#d6cec7';

            ctx.fillText(fullMessageArgs, canvas.width / 3.8, canvas.height / 1.4);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'achievement.png');
      
            message.channel.send(attachment).then(m.delete())
  }catch (e){
    return;
  }
}
    

module.exports.config = {
    name: "achievement",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 2000,
    aliases: ['xbox']
}