const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

  if(message.content.includes("@here") || message.content.includes("@everyone")) return false;

 

  let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

  if(!toBan)return message.channel.send('add a user to ban!');


  if(message.member === toBan)return message.channel.send('You cant ban yourself idiot.')

  if(message.guild.me === toBan)return message.channel.send('You cant ban me like this idiot.')

  

  if(toBan.hasPermission("BAN_MEMBERS")) return message.channel.send('you cant ban that user, because he has either admin, or ban perm.')

  const messageArray = message.content.split(' ');
  const args2 = messageArray.slice(1);

  const reason = args2.slice(1).join(' ') || "There was no reason!";

  if (reason.length > 495) reason = `Too long to write it in here, discord allows only 511 characters!`

  const worky = toBan.ban({reason: `${message.member.user.tag}, ${reason}`})

  if(!worky)return message.channel.send(`I cant ban that user, i need a higher role!`)

  message.channel.send(`${toBan} has been banned from the server!\nReason: **${reason}**`);

  const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} banned ${toBan}`)
          .setTimestamp();
          log.send(embed)
        }
    }

  const banEmbed = new Discord.MessageEmbed()
    .setTitle(`Hello ${toBan.user.username}!`)
    .setColor("#985ce7")
    .setDescription(`you have been banned from **${message.guild.name}**!\nReason: **${reason}**.`)
    .setTimestamp();

  message.toBan.send(banEmbed).catch(() => {
        
        message.channel.send(`couldn't dm ${kickmember.user.username} about being banned.`);
    });
}



module.exports.config = {
    name: "ban",
    userPermissions: [`BAN_MEMBERS`],
    botPermissions: [`BAN_MEMBERS`],
    timeout: 1000,
    aliases: []
}
