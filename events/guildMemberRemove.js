const Discord = require('discord.js');
const byeChannel = require('../models/byeChannel');

module.exports = async (client, member) => {
  try {
    let guild = member.guild
    const data = await byeChannel.findOne({
        GuildID: guild.id
    });

   if(!data)return;

   const channel = await member.guild.channels.cache.get(data.ChannelID);

   if(!channel)return;

    

      const goodbyeEmbed = new Discord.MessageEmbed()

        .setColor("#985ce7")
        .setTitle(`${member.user.username} (\`${member.id}\`)`)
        .setDescription('left the server, damn...')
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter('bye', member.guild.iconURL({dynamic: true}));

      channel.send(goodbyeEmbed)

    

  } catch (e) {
    return;
  }
}