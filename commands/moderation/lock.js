const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

  try{


  const channel = message.mentions.channels.first() || message.channel;

    let role = message.guild.roles.everyone;

    if(!channel.permissionsFor(role).has('SEND_MESSAGES'))return message.reply(`${channel} is already locked!`);



    channel.updateOverwrite(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
        })

   

    let lockEmbed = new Discord.MessageEmbed()
    .setTitle("**🔒 LOCKED CHANNEL**")
    .setAuthor(message.member.user.tag)
    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
    .setColor("#985ce7")
    .setDescription(`**${channel}** has now been locked!`)

    message.channel.send(lockEmbed);

    const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} locked ${channel}`)
          .setTimestamp();
          log.send(embed)
        }
    }

    }catch(e){
    return 
  }
   
      
}

module.exports.config = {
    name: "lock",
    userPermissions: [`MANAGE_CHANNELS`],
    botPermissions: [`MANAGE_CHANNELS`],
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["lockchannel"]
}
