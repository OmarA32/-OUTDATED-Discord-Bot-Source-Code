const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args, prefix) => {

let fun = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('misc')
        .setAuthor(message.author.tag)
        .setURL('https://www.youtube.com/watch?v=dk8W_E-cDlY')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
          { name: '📜 **__channels__**', value: `"\`📮bot-updates\`", in this channel, i will send the latest updates and bug fixes through the kitten.` },

          { name: '📕 **__links__**', value: `\`${prefix}invite\`/\`${prefix}vote\`` },

        )
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(fun)
}

module.exports.config = {
    name: "misc",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
