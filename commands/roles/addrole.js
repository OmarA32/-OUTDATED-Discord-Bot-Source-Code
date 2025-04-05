const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports = {
    name : 'addrole',
    run : async(client, message, args) => {
      try{
     
        
        const target = message.mentions.members.first() 

        if(!target) return message.channel.send('No member specified!') 

        const role = message.mentions.roles.first() 

        if(!role) return message.channel.send('No role specified!') 
        
       if(!target.editable)return message.channel.send('I cant edit that user give me a higher role!') 

        await target.roles.add(role) 
        
        message.channel.send(`**${target.user.username}** has obtained a role!`)

        const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} gave ${target} the role ${role}`)
          .setTimestamp();
          log.send(embed)
        }
    }
      }catch(e){
        return;
      }
    }
    
}

module.exports.config = {
    name: "addrole",
    userPermissions: [`MANAGE_ROLES`],
    botPermissions: [`MANAGE_ROLES`],
    timeout: 1000,
    aliases: []
}
