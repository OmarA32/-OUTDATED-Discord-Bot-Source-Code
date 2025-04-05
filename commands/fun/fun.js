const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args, prefix) => {
  try{
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return


  
 let fun = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('fun')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/7Tbt1rB8VuI')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .addFields(
          { name: '😳 **__actions__**', value: `\`${prefix}punch/ki/hug/flip <user-optional>\``},

          { name: '🐍 **__MINI GAMES__**', value: `\`${prefix}truth(t)\`/\`${prefix}dare(d)\`\n\`${prefix}fasttype\`/\`${prefix}fight <user>\`\n\`${prefix}coin\`` },

          { name: '⚰ **__epic commands__**', value: `\`${prefix}love/nose <@user / name>\`\n\`${prefix}meme\`\n\`${prefix}incident\`\n\`${prefix}bigboss\`\n\`${prefix}cat\`` },

          { name: '🎧 **__VC GAMES__**', value: `\`${prefix}youtubetogether(ytt)\`\n\`${prefix}poker\`\n\`${prefix}betrayal\`\n\`${prefix}fishing\`` },


        )
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(fun)
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "fun",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
