const afk = require('../models/afk');
const botsettings = require('../botsetting.json')
const Discord = require('discord.js');

async function afkFunction(client, message, prefix) {
  try{

    const mainData = await afk.findOne({
    UserID: message.author.id,
  });


  if (mainData) {
    
    mainData.deleteOne({
      UserID: message.author.id,
    });

    if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send(`**Welcome back!** I removed your AFK **${message.author.username}**.`);
  }


  const mentioned = message.mentions.members.first();

  if(!mentioned)return

  else if (mentioned) {
    const dataafk = await afk.findOne({
      UserID: mentioned.id,
    });

    if (dataafk && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
      const afkEmbed = new Discord.MessageEmbed()
      .setTitle(`**Reason:**`)
      .setDescription(`${dataafk.Reason}`)
      .setColor(`#985ce7`)
      .setTimestamp()

      message.channel.send(`**${mentioned.user.username}** is currently \`AFK\`.`, afkEmbed);
    }

  }
  }catch(e){
    return
  }
}

module.exports = {
    afkFunction
}