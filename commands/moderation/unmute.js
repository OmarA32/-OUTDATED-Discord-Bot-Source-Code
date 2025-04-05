const Discord = require("discord.js")
const botsettings = require('../../botsetting.json');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
  try{

  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

   

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if(!Member) return message.channel.send('Member not found')

        

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'mute');

        if(!role) return message.channel.send(`couldn't find the "mute" role.`)

        else if(role){

        if(!Member.roles.cache.has(role.id)) return message.channel.send(`**${Member.displayName}** doesn't have a "mute" role. couldn't unmute him.`);
        
        else{

        await Member.roles.remove(role)

        message.channel.send(`**${Member.displayName}** is now unmuted`)

        const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} umuted ${Member}`)
          .setTimestamp();
          log.send(embed)
        }
    }
        }
        }

   }catch(e){
     return message.channel.send(`couldnt find or remove the "mute" role`)
    }
}

module.exports.config = {
    name: "unmute",
    userPermissions: [`BAN_MEMBERS`],
    botPermissions: [`MANAGE_ROLES`],
    timeout: 1000,
    aliases: []
}