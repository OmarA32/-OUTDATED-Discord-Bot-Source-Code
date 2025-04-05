const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json')
const prefix = require('../../models/prefix');

module.exports.run = async (client, message, args, prefix) => {

    
  let moderation = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('moderation')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/p6HmFJ9KL3I')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
          { name: '⚙ **__control__**', value: `\`${prefix}Mute <@user>\`\n\`${prefix}unmute <@user>\`\n\`${prefix}tempmute <user> <time>\`\n\`${prefix}kick <user>\`\n\`${prefix}ban <user> <reason>\`\n\`${prefix}unban <user tag/user id>\`\n\`${prefix}addrole <user> <role>\`\n\`${prefix}removerole <user> <role>\`\n\n📕 **warns**\n\`${prefix}warn <user> <the warining>\`\n\`${prefix}warnings <user>\`\n\`${prefix}remove-warn <user>\`\n\`${prefix}clearwarns <user>\`\n\n🗳 **polls**\n\`${prefix}poll <channel> <your poll>\`\n\n🎉 **giveaways**\n\`${prefix}giveaway <#channel> <time> <number of winners> <prize>\`\n\`${prefix}end-giveaway <message id>\`\n\`${prefix}reroll <message id>\`\n\n📃 **command logs**\n\`${prefix}set-logs <#channel>\`\n\`${prefix}disable-logs\`` },
        )
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(moderation)
      
}

module.exports.config = {
    name: "moderation",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["mod"]
}
