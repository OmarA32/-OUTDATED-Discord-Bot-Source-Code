const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args, prefix) => {

let images = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('image commands')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/lgUGw7nl2w4')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(

          { name: '😐 **__image commands__**', value: `\`${prefix}wasted\`/\`${prefix}wanted\`/\`${prefix}triggered\`/\`${prefix}trash\`/\`${prefix}shit\`/\`${prefix}rip\`/\`${prefix}ohno\`/\`${prefix}jail\`/\`${prefix}invert\`/\`${prefix}hitler\`/\`${prefix}gay\`/\`${prefix}delete\`/\`${prefix}youtube\`/\`${prefix}affect\`/\`${prefix}woosh\`/\`${prefix}facepalm\`/\`${prefix}achievement\`/\`${prefix}whatsapp\``},


          { name: '😳 **__must @user__**', value: `\`${prefix}spank <user>\`\n\`${prefix}slap <user>\`\n\`${prefix}quote <user>\`` },          


        )
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(images)
}

module.exports.config = {
    name: "image",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["images"]
}
