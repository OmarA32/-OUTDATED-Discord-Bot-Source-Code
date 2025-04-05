const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');
const Role = require("../../models/role");

module.exports.run = async(client, message, args) => {
      try{

        const role = message.mentions.roles.first();

        if(!role)return message.reply(`You must add a valid role when using the command!`)

        const data = await Role.findOne({
        GuildID: message.guild.id
    });

    if (data) {

        await Role.findOneAndRemove({
            GuildID: message.guild.id
        })

        let newData = new Role({
            GuildID: message.guild.id,
            RoleID: role.id,
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
          .setDescription(`${message.author} added ${role} as a joining role.`)
          .setTimestamp();
          log.send(embed)
        }
    }

        return message.reply(`👍 \`${role.name}\` will be used as a joining role.`)


    } else if(!data){

      let newData = new Role({
            GuildID: message.guild.id,
            RoleID: role.id,
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
          .setDescription(`${message.author} added ${role} as a joining role.`)
          .setTimestamp();
          log.send(embed)
        }
    }

        return message.reply(`👍 \`${role.name}\` will be used as a joining role.`)
    }
     
        
        
      }catch(e){
        return;
      }
}
    


module.exports.config = {
    name: "setrole",
    userPermissions: [`ADMINISTRATOR`],
    botPermissions: [`MANAGE_ROLES`],
    timeout: 1000,
    aliases: ["set-role"]
}