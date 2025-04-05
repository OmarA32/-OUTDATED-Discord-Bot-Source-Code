const welcomeChannel = require('../../models/welcomeChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    


    let channel = message.mentions.channels.first() || message.channel;

    const data = await welcomeChannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await welcomeChannel.deleteOne({
            GuildID: message.guild.id
        })

        let newData = new welcomeChannel({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

        message.channel.send(`${channel} will be used for welcoming new members 👍.`);

        const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} set ${channel} as **the welcoming channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {

        let newData = new welcomeChannel({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

        message.channel.send(`${channel} will be used for welcoming new members 👍.`);
    }

}

module.exports.config = {
    name: "set-welcome",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["enable-welcome"]
}