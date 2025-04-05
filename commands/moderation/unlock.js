const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

  try{


  const channel = message.mentions.channels.first() || message.channel;

    let role = message.guild.roles.everyone;

    if(channel.permissionsFor(role).has('SEND_MESSAGES'))return message.reply(`${channel} is already unlocked!`);


    channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true,
        })
   

    let unlockEmbed = new Discord.MessageEmbed()
    .setTitle("**🔓 UNLOCKED CHANNEL**")
    .setAuthor(message.member.user.tag)
    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
    .setColor("#985ce7")
    .setDescription(`**${channel}** has now been unlocked!`)
    
    message.channel.send(unlockEmbed);

    const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} unlocked ${channel}`)
          .setTimestamp();
          log.send(embed)
        }
    }

  }catch(e){
   return 
  }
   
      
}

module.exports.config = {
    name: "unlock",
    userPermissions: [`MANAGE_CHANNELS`],
    botPermissions: [`MANAGE_CHANNELS`],
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["unlockchannel"]
}
