const Discord = require('discord.js');
const botsettings = require('../../botsetting.json')
const prefix = require('../../models/prefix');
const functions = require("../../functions");

module.exports.run = async (client, message, args, prefix) => {

  

      let prefixhelp = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('prefix')
        .setAuthor(message.author.tag, "https://i.imgur.com/BKbaUza.png")
        .setURL('https://youtu.be/LNuwgbxQe-M')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`⚙ **current prefix**  (**\`${prefix}\`**)`)
        .addFields(
          { name: `📜 **how to use**`, value: `To set a prefix:\n\`${prefix}set-prefix <any prefix>\`\n\nAnd to reset the prefix:\n\`${prefix}reset-prefix\`` },
          { name: `‼ **requirements**`, value: 'the user must have administration!\nand it must be at most 5 characters.' },
        )
        .setFooter(functions.footer(prefix), botsettings.gif1);

  
     return  message.channel.send(prefixhelp)
    


}

module.exports.config = {
    name: "prefix",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}