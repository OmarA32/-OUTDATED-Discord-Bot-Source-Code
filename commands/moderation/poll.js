const Discord = require('discord.js');
const logs = require('../../models/logs');
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args) => {
  try{
  

      let pollChannel = message.mentions.channels.first();

      if(!pollChannel) return message.reply(`mention a channel!`)

      if(!pollChannel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return message.reply(`I dont have permission to send messages in there!`);

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

      let pollDescription = args2.slice(1).join(' ');

      if(!pollDescription)return message.reply(`type something to poll!`)

      const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} made a poll in ${pollChannel}`)
          .setTimestamp();
          log.send(embed)
        }
    }

      let embedPoll = new Discord.MessageEmbed()
        .setTitle(`(${message.author.tag}) made a New Poll:`)
        .setDescription(pollDescription)
        .setColor("#985ce7")

      let msgEmbed = await pollChannel.send(embedPoll);

      if(!msgEmbed)return;

      await msgEmbed.react('👍')
      await msgEmbed.react('👎')

    
  } catch (e) {
    console.log(e)
    return;
  }
}
  
module.exports.config = {
    name: "poll",
    userPermissions: [`ADMINISTRATOR`],
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}
