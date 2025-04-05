const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
  try{


    if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please put a number only!') }

    if (parseInt(args[0]) > 99)return message.reply('You can only delete 99 messages at a time!')
    
    let deleteAmount = parseInt(args[0]);
    

   await message.channel.bulkDelete(deleteAmount + 1, true).then(message.reply(`**Successfully** Deleted ***${deleteAmount}*** Messages.`).then(msg => msg.delete({timeout: 3000})))

   const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} purged **${deleteAmount}** messages`)
          .setTimestamp();
          log.send(embed)
        }
    }
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "purge",
    userPermissions: [`MANAGE_MESSAGES`],
    botPermissions: [`MANAGE_MESSAGES`],
    timeout: 1500,
    aliases: []
}