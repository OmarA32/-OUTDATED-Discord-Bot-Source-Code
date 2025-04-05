const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports = {
    name: "av",

     
    async run (client, message, args) {

     if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
     
        let guild = message.guild;

        let avatar = guild.iconURL({size: 1024, dynamic : true})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${guild.name}'s avatar`)
        .setImage(avatar)
        .setColor('#985ce7')

        message.channel.send(embed);
      
       
       
    }
}

module.exports.config = {
    name: "serverav",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['guildavatar', 'serveravatar', 'serverpfp', 'sav']
}
