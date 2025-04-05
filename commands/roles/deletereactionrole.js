const { ReactionRoleManager } = require('discord.js-collector');
const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');


module.exports.run = async (client, message, args) => {

  if(message.content.includes("@here") || message.content.includes("@everyone")) return false;



    const emoji = args[0];
      if (!emoji)
        return message.reply('You need use a valid emoji.').then(m => m.delete({ timeout: 1000 }));

    const msg = await message.channel.messages.fetch(args[1]);
      if (!msg)
        return message.reply('Message not found! Wtf...').then(m => m.delete({ timeout: 1000 }));

      

      await client.reactionRoleManager.deleteReactionRole({ message: msg, emoji });
      message.reply("done.").then(m => m.delete({ timeout: 1000 }));

      const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} deleted a **reaction role**`)
          .setTimestamp();
          log.send(embed)
        }
    }
}


module.exports.config = {
    name: "deletereactionrole",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1000,
    aliases: ['removereactionrole', 'removerr', 'deleterr']
}