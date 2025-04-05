const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports = {
    name: "av",
    description: "Brodcast someone's avatar",
     
    async run (client, message, args) {
      if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

        let avatar = member.user.displayAvatarURL({size: 1024, dynamic : true})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.username}'s avatar`)
        .setImage(avatar)
        .setColor('#985ce7')

        message.channel.send(embed);
      
       
       
    }
}

module.exports.config = {
    name: "av",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ['avatar', 'pfp']
}
