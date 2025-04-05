const Discord = require('discord.js');
const botsettings = require('../../botsetting.json')
const prefix = require('../../models/prefix');
const functions = require("../../functions");

module.exports.run = async (client, message, args, prefix) => {


      let help = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('HELP')
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setURL('https://youtu.be/gjEVoSIheAA')
        .setDescription(`The prefix is (**\`${prefix}\`**)`)
        .setThumbnail('https://i.imgur.com/BKbaUza.png')
        .addFields(
          { name: `🔒  (\`${prefix}moderation\`)`, value: 'help with, ban, purge, mute, giveaways, etc..', inline: true},
          { name: `🏅  (\`${prefix}roles\`)`, value: 'adding reaction roles, joining role, and more info.' , inline: true},
          { name: `🗿  (\`${prefix}fun\`)`, value: 'mini games, and user actions!' , inline: true},
          { name: `🎱  (\`${prefix}image\`)`, value: 'create memes and images.', inline: true },
          { name: `💡  (\`${prefix}commands\`)`, value: 'many useful actions and commands to use.' , inline: true},
          { name: `💽  (\`${prefix}music\`)`, value: 'many music commands!' , inline: true},
          { name: `👋  (\`${prefix}welcome\`/\`${prefix}bye\`)`, value: 'wlecoming and goodbye messages.' , inline: true},
          { name: `📈  (\`${prefix}levels\`)`, value: 'the ranking system and the leaderboard.' , inline: true},
          { name: `🤖  (\`${prefix}chat\`)`, value: 'a guide to setup a chat channel, where the bot will respond to the messages' , inline: true},
          { name: `✉  (\`${prefix}dmhelp\`)`, value: 'if you need any support or want to use the confession command.', inline: true},
          { name: `🚨  (\`${prefix}auto-mod\`)`, value: 'a simple auto-mod.', inline: true},
          { name: `✅  (\`${prefix}prefix\`)`, value: 'a guide to setup or reset your prefix.',inline: true},
          { name: '🛑 **more info** 🛑', value: `[\`join our server!\`]()\n[\`invite the kitten to your server!\`]()\n[\`visite the kitten's website.\`]()` },

        )
        .setFooter(functions.footer(prefix), botsettings.gif1);

  
     return  message.channel.send(help)
    

   


}

module.exports.config = {
    name: "help",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}