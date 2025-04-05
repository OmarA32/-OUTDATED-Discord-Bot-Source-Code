const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args, prefix) => {

  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  
  let byehelp = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle("Goodbye'ing")
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/v74vH3LjSuo')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`📢 __BYE'ing!__\n\nto setup a "bye" channel:\n\`${prefix}set-bye <#channel-optional>\`\n\nAnd to disable the "bye" channel:\n\`${prefix}remove-bye\``)
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(byehelp)
}

module.exports.config = {
    name: "bye",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
