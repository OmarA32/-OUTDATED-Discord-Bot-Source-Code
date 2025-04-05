const levelsOptions = require('../../models/levelsOptions');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    


    const data = await levelsOptions.findOne({
        GuildID: message.guild.id
    });

    if (!data) {

        let newData = new levelsOptions({
            GuildID: message.guild.id,
            Option: "off"
        })
        newData.save();

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} disabled **levels**`)
          .setTimestamp();
          log.send(embed)
        }
    }

        return message.channel.send(`levels are now disabled!`);


    }

    else if (data.Option === "off") {

    return message.channel.send(`levels are already disabled`);

    }else if (data.Option === "on"){

    await levelsOptions.deleteOne({
            GuildID: message.guild.id
        })

    let newData = new levelsOptions({
            GuildID: message.guild.id,
            Option: "off"
        })
        newData.save();

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} disbaled **levels**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    return message.channel.send(`levels are now disabled!`);

    } 

}

module.exports.config = {
    name: "disablelevels",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["disable-levels"]
}