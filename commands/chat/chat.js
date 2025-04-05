const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');



module.exports.run = async (client, message, args, prefix) => {    

  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  
  let chat = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('misc')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/SGzeodxnYz4')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
          { name: `📜 **how to use**`, value: `To set a channel:\n\`${prefix}set-ai <#channel-optional>\`\n\nAnd to remove the ai from the channel:\n\`${prefix}remove-ai\``},
        )
        .setFooter(functions.footer(prefix), botsettings.gif1);
        message.channel.send(chat);
}

module.exports.config = {
    name: "chat",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
