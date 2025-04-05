const levelsOptions = require('../../models/levelsOptions');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    
  try{
    

   

    const data = await levelsOptions.findOne({
        GuildID: message.guild.id
    });
  

    if(!data){
      
      return message.channel.send(`levels are already enabled`);

   
   } else if (data.Option === "on") {
        
        return message.channel.send(`levels are already enabled`);

    } else if (data.Option === "off") {
     
      await levelsOptions.deleteOne({
            GuildID: message.guild.id
        })
     
        let newData = new levelsOptions({
            GuildID: message.guild.id,
            Option: "on"
        })
        newData.save();

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} enabled **levels**`)
          .setTimestamp();
          log.send(embed)
        }
    }
      
        return message.channel.send(`levels are now enabled!`);
    }
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "enablelevels",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["enable-levels"]
}