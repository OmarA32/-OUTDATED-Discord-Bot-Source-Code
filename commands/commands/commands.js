const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args, prefix) => {

  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  
 let commands = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('commands')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/uWgJOUhLRRY')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
          { name: '🆘 **__user commands__**', value: `\`${prefix}avatar <user-optional>\`\n\`${prefix}banner <user-optional>\`\n\`${prefix}info <user-optional>\`` },


          { name: '🔮 **__other commands__**', value: `\`${prefix}snipe\`\n\`${prefix}editsnipe\`\n\`${prefix}steal <emoji>\`\n\`${prefix}serverav (shows server avatar)\`\n\`${prefix}say <text>\`\n\n\`${prefix}wiki <search something>\`\n\`${prefix}covid <all / specific country>\`\n\`${prefix}afk <reason-optional>\`\n\`${prefix}reddit <subreddit>\`` },



        )
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(commands)
}

module.exports.config = {
    name: "commands",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["command"]
}
