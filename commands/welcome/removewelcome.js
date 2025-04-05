const welcomeChannel = require('../../models/welcomeChannel');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    

  


    const data = await welcomeChannel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await welcomeChannel.deleteOne({
            GuildID: message.guild.id
        })

        message.channel.send(`the welcoming messages are now disabled!`);

        const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} disabled **the welcoming channel**`)
          .setTimestamp();
          log.send(embed)
        }
    }

    } else if (!data) {

        message.channel.send(`there is no channel used for the welcoming to start with!`);

    }

}

module.exports.config = {
    name: "remove-welcome",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["disable-welcome"]
}