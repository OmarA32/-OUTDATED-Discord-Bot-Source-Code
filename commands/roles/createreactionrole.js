const { ReactionRoleManager } = require('discord.js-collector');
const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');


module.exports.run = async (client, message, args, prefix) => {

  if(message.content.includes("@here") || message.content.includes("@everyone")) return false;

  try{
  const role = message.mentions.roles.first();
      if (!role)
        return message.reply(`You need mention a role, use <${prefix}roles> for more info.`).then(m => m.delete({ timeout: 4000 }));

      const emoji = args[1];
      if (!emoji)
        return message.reply(`You need use a valid emoji, use <${prefix}roles> for more info.`).then(m => m.delete({ timeout: 4000 }));

      const msg = await message.channel.messages.fetch(args[2]);
      if (!msg)
        return message.reply(`Message not found! add the message id!, use <${prefix}roles> for more info.`).then(m => m.delete({ timeout: 4000 }));

      const reacttype = parseInt(args[3]);
      if (!reacttype)
        return message.reply(`you must add a valid type! a number from 1 to 5, use <${prefix}roles> for more info.`).then(m => m.delete({ timeout: 3000 }));
      
      if(isNaN(reacttype))return message.reply(`you must add a valid type! a number from 1 to 5, use <${prefix}roles> for more info.`).then(m => m.delete({ timeout: 4000 }));

      if(parseInt(reacttype) > 5)return message.reply(`you must add a valid type! a number from 1 to 5, use <${prefix}roles> for more info.`).then(m => m.delete({ timeout: 4000 }));
      


      client.reactionRoleManager.createReactionRole({
        message: msg,
        roles: [role],
        emoji,
        type: reacttype
      });


      message.reply('Done').then(m => m.delete({ timeout: 500 }));

      const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} made a **reaction role**`)
          .setTimestamp();
          log.send(embed)
        }
    }
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "createreactionrole",
    userPermissions: [`MANAGE_ROLES`],
    botPermissions: [`MANAGE_ROLES`],
    timeout: 1000,
    aliases: ['createrr']
}