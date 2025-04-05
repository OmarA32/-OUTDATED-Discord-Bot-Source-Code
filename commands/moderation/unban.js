const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

      if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

      if (!args[0]) return message.channel.send('add a user id to unban!');

      let tounBan = client.users.cache.get(args[0]);

      if (!tounBan) return message.channel.send(`couldn't find that user.`);

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);
       
      const reason = args2.slice(1).join(' ') || "There was no reason!";

      if (reason.length > 495) reason = `Too long to write it in here, discord allows only 511 characters!`

      message.guild.members.unban(tounBan, `${message.member.user.tag}, ${reason}`)

      message.channel.send(`${tounBan} has been unbanned from the server!`)

      const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} unbanned ${tounBan}`)
          .setTimestamp();
          log.send(embed)
        }
    }
}


module.exports.config = {
    name: "unban",
    userPermissions: [`BAN_MEMBERS`],
    botPermissions: [`BAN_MEMBERS`],
    timeout: 1000,
    aliases: []
}
