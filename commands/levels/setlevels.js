const levelschannel = require('../../models/levelsChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    

    if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have enough permissions to change the the level-ups channel! only admins can.");

    let channel = message.mentions.channels.first() || message.channel;

    const data = await levelschannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await levelschannel.deleteOne({
            GuildID: message.guild.id
        })

        let newData = new levelschannel({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

        message.channel.send(`${channel} will be used for the level-ups 👍.`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} set ${channel} as the leveling channel`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {

        let newData = new levelschannel({
            GuildID: message.guild.id,
            ChannelID: channel.id
        })
        newData.save();

        message.channel.send(`${channel} will be used for the level-ups 👍.`);
    }

}

module.exports.config = {
    name: "set-levels",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["setlevels"]
}