const byeChannel = require('../../models/byeChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    

    let channel = message.mentions.channels.first() || message.channel;

    const data = await byeChannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await byeChannel.deleteOne({
            GuildID: message.guild.id
        })

        let newData = new byeChannel({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

        if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))message.channel.send(`${channel} will be used for saying goodbye to the members when they leave 👍.`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log && log.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} set ${channel} as the **goodbye channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {

        let newData = new byeChannel({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

        if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))message.channel.send(`${channel} will be used for saying goodbye to the members when they leave 👍.`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log && log.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} set ${channel} as the **welcoming channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }
    }

}

module.exports.config = {
    name: "set-bye",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["enable-bye"]
}