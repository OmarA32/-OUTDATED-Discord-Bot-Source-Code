const Discord = require('discord.js');
const Canvas = require("canvas")
const welcomeChannel = require('../models/welcomeChannel');
const Role = require("../models/role");

module.exports = async (client, member) => {
  try {
  const guild = member.guild;

  const dataRole = await Role.findOne({
        GuildID: guild.id
    });
   
  if(dataRole){
    const role = await guild.roles.cache.get(dataRole.RoleID)
       if(role) await member.roles.add(role);

    }
    
  const data = await welcomeChannel.findOne({
        GuildID: guild.id
    });

  if(data){

   
  const channel = guild.channels.cache.get(data.ChannelID);

  
   
  

  
  
  if (channel && channel.permissionsFor(guild.me).has('ATTACH_FILES', 'SEND_MESSAGES')) {
    
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(`././welcome.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome to ${member.guild.name}!**
      Hi ${member}!, read and accept the rules!`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);

      
      //send the welcome embed to there
      channel.send(member.user, welcomeembed);
      
      return;
	
    
  
  }else {
    return;
  }

  

    }else if (!data)return
  } catch (e) {
    console.log(e)
      return;
    }
}