const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args, prefix) => {

  let welcomehelp = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle("Welcoming")
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/QcobCsBU6ww')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`📢 __WELCOMING!__\nto setup a Welcoming channel:\n\`${prefix}set-welcome <#channel-optional>\`\n\nAnd to disable the Welcoming channel:\n\`${prefix}remove-welcome\`\n\n👋 **__JOINING ROLE__**\n\n\`${prefix}set-role <@role>\`\n\`${prefix}disable-role\`\n\nAny user that joins will get that role automatically.`)
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(welcomehelp)
}

module.exports.config = {
    name: "welcome",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
