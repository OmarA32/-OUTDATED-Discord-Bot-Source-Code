const byeChannel = require('../../models/byeChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    

    const data = await byeChannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await byeChannel.deleteOne({
            GuildID: message.guild.id
        })

        if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))message.channel.send(`the "bye" messages are now now disabled!`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log && log.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} disabled the **goodbye channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

        else return message.channel.send(`theres no channel used for the "bye" messages to start with!`);

    }

}

module.exports.config = {
    name: "remove-bye",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["disable-bye"]
}