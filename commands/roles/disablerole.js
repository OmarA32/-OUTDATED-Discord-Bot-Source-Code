const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');
const Role = require("../../models/role");

module.exports.run = async(client, message, args) => {
      try{


        const data = await Role.findOne({
        GuildID: message.guild.id
    });

    if (data) {

        await Role.findOneAndRemove({
            GuildID: message.guild.id
        })

        

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} removed the **joining role.**`)
          .setTimestamp();
          log.send(embed)
        }
    }

        return message.reply(`👍 disabled the joining role.`)


    } else if(!data){

      return message.reply(`The joining role is already disabled.`)
    }
     
        
        
      }catch(e){
        return;
      }
}
    


module.exports.config = {
    name: "disablerole",
    userPermissions: [`ADMINISTRATOR`],
    botPermissions: [`MANAGE_ROLES`],
    timeout: 1000,
    aliases: ["disable-role"]
}