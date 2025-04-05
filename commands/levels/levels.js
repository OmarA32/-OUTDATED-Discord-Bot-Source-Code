const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args, prefix) => {

  let levelshelp = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('Levels')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/gjEVoSIheAA')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
          { name: '🏆 __LEVELS!__', value: `\`${prefix}rank <user-optional>\`\n\`${prefix}leaderboard(${prefix}lb)\`\n\`${prefix}set-background <attach image>\`\n\`${prefix}remove-background\`\n\`${prefix}set-color <hex color code>\`\n\`${prefix}remove-color\`\n\nYou must be at least level 1 to use any of the leveling commands!\n\n\n**__for server owners__**\nYou can disable and enable the leveling system by:\n\`${prefix}disable-levels\`\n\`${prefix}enable-levels\`\n\nAlso you can set a channel for the level-ups by using:\n\`${prefix}set-levels <#channel-optional>\`\n\nand disable that channel by using:\n\`${prefix}remove-levels\`\n\nTo give change a user's level use:\n\`${prefix}give-level <the level>\` (only up to 99)`},
        )
        .setFooter(functions.footer(prefix), botsettings.gif2);
      message.channel.send(levelshelp)
}

module.exports.config = {
    name: "levels",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
