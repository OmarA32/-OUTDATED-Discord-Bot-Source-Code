const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const functions = require("../../functions");



module.exports.run = async (client, message, args, prefix) => {
  

          const invite = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setTitle(`Kitten links`)
          .setDescription(`links to vote:\n\n[\`top gg\`]()\n[\`discord bots\`]()\n[\`discord bot list\`]()\n\nthanks for using the kitten!`)
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setFooter(functions.footer(prefix), botsettings.gif1);
        message.channel.send(invite);
          
      
}

module.exports.config = {
    name: "vote",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}