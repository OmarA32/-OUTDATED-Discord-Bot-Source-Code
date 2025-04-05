const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    
  try{


    const channel = message.mentions.channels.first();

    if(!channel) return message.reply(`must mention a channel! to send the logs in.`)


    const data = await logs.findOne({
        GuildID: message.guild.id
    });
  

    if(!data){
      
      let newData = new logs({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

      return message.channel.send(`👍 the logs are now enabled! will use ${channel} to send the logs.`);

    } else if (data) {
     
      await logs.deleteOne({
            GuildID: message.guild.id
        })
     
        let newData = new logs({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();
      
        return message.channel.send(`👍 the logs are already enabled, but ill use ${channel} now as the new log channel.`);
    }
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "setlogs",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["enable-logs", "set-logs", "enablelogs"]
}