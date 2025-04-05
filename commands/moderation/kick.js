const Discord = require('discord.js');
const logs = require('../../models/logs');
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args) => {

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    const kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

    if (!kickmember) return message.channel.send('add someone to kick!');



   if(message.member === kickmember)return message.channel.send('You cant kick yourself idiot.')

   if(message.guild.me === kickmember)return message.channel.send('You cant kick me like this idiot.')


   if(kickmember.hasPermission("KICK_MEMBERS") || kickmember.hasPermission("ADMINISTRATOR")) return message.channel.send('you cant kick that user, because he either has admin, or ban perm.')
     

    const messageArray = message.content.split(' ');
    const args2 = messageArray.slice(1);

   const reason = args2.slice(1).join(' ') || "There was no reason!";

   if (reason.length > 495) reason = `Too long to write it in here, discord allows only 511 characters!`

  const worky = kickmember.kick({reason: `${message.member.user.tag}, ${reason}`})

  if(!worky)return message.channel.send(`I cant kick that user, i need a higher role!`)
 
    message.channel.send(`${kickmember} has been successfully kicked!\nreason: ${reason}`);



    const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} kicked ${kickmember}`)
          .setTimestamp();
          log.send(embed)
        }
    }



        const kickEmbed = new Discord.MessageEmbed()
          .setTitle(`Hello ${kickmember.user.username}!`)
          .setColor("#985ce7")
          .setThumbnail(message.guild.iconURL({size: 1024, dynamic : true}))
          .setDescription(`You have been kicked from **${message.guild.name}**!\nReason: **${reason}**.`)
          .setTimestamp();

        kickmember.send(kickEmbed).catch(() => {
        
        message.channel.send(`couldn't dm ${kickmember.user.username} about being banned.`);
    });


  
    

  
}

module.exports.config = {
    name: "kick",
    userPermissions: [`KICK_MEMBERS`],
    botPermissions: [`KICK_MEMBERS`],
    timeout: 1000,
    aliases: []
}
