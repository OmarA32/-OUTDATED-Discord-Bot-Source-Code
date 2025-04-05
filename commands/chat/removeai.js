const aiChannel = require('../../models/aiChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    

  

    const data = await aiChannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await aiChannel.deleteOne({
            GuildID: message.guild.id
        })

        if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))message.channel.send(`The Ai-chat is disabled in this channel now.`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log && log.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} removed the **ai-chat channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

        else return message.channel.send(`this channel is not used for the ai-chat to start with!`);

    }

}

module.exports.config = {
    name: "removeai",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["remove-ai", "delete-ai", "deleteai", "disable-ai", "disableai"]
}