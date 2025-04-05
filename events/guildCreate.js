const Discord = require('discord.js');
const botsettings = require('../botsetting.json')


module.exports = async (client, guild) => {
  let prefix = botsettings.prefix;
   try {
    const join = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))

    if(!join)return;

    const botjoin = new Discord.MessageEmbed()

      .setColor("#985ce7")
      .setTitle("Hello!")
      .setDescription('thank you for inviting me to your server!\nAnd maybe [\`join our community\`](https://discord.gg/zcVryN2vkx) if you want.')
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setFooter(`use (${prefix}help) if you need any, and Enjoy!`, botsettings.gif1);
    join.send(botjoin)


    const log = await client.channels.cache.get(botsettings.guildAdd)

    if(log){
      const logEmbed = new Discord.MessageEmbed()

      .setColor("#985ce7")
      .setTitle(`**${guild.name}**`)
      .setDescription(`joined: **${guild.name}**\n\nID: \`${guild.id}\`\nmembers: \`${await guild.members.cache.size}\`\nchannels: \`${await guild.channels.cache.size}\``)
      .setTimestamp();

    if(guild.iconURL()) logEmbed.setThumbnail(guild.iconURL({dynamic: true}));

    log.send(logEmbed)
    }

  } catch (e) {
    return;
  }
}