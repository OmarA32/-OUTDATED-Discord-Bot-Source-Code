const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args, prefix) => {   
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
   
  let modhelp = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle("Auto-mod")
        .setURL('https://youtu.be/itKFs0YFoz8')
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`🚨 __auto-mod!__\n\nto enable auto-mod:\n\`${prefix}enable-mod\`\n\nAnd to disable auto-mod:\n\`${prefix}disable-mod\`\n\nwhat it does:\n1. deletes the **N word** (hard R).\n2. deletes the **F word**.`)
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(modhelp)
}

module.exports.config = {
    name: "automod",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["auto-mod"]
}