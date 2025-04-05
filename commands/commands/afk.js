const afk = require('../../models/afk');
const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (message.mentions.roles.first()) {

    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

    return message.channel.send("**DONT PING ROLES**");
  }
  const messageArray = message.content.split(' ');
  const args2 = messageArray.slice(1);

  const dataafk = await afk.findOne({
    UserID: message.author.id
  });

  if (!dataafk) {
    const reason = args2.slice(0).join(' ') || 'No Reason';

    const newAfk = new afk({
      UserID: message.author.id,
      Reason: reason,
    });
    newAfk.save();


    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

    const afkEmbed = new Discord.MessageEmbed()
    .setTitle(`**Reason:**`)
    .setDescription(`${reason}`)
    .setColor(`#985ce7`)
    .setTimestamp()

    message.channel.send(`**${message.author.username}**, You are now \`AFK\`.`, afkEmbed);

  } else if (dataafk) {
    await afk.deleteOne({
      UserID: message.author.id
    });

    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

    message.channel.send(`${message.author.username}, welcome back! I removed your AFK.`);
  }
}

module.exports.config = {
  name: "afk",
  botChannelPermissions: [`EMBED_LINKS`],
  timeout: 1000,
  aliases: []
}