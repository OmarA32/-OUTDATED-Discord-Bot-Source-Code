const levelschannel = require('../../models/levelsChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {


    const data = await levelschannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await levelschannel.deleteOne({
            GuildID: message.guild.id
        })

        message.channel.send(`the level-ups channel is now disabled!`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} removed the **leveling channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {

        message.channel.send(`there is no channel used for the level-ups to start with!`);

    }

}

module.exports.config = {
    name: "remove-levels",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["delete-levels"]
}