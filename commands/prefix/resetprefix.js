const prefixModel = require("../../models/prefix")
const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');


module.exports.run = async (client, message, args) => {
    

    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });


    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send(`The new prefix is now (**\`${botsettings.prefix}\`**)`);

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} changed the **prefix** to  \`${botsettings.prefix}\``)
          .setTimestamp();
          log.send(embed)
        }
    }

        
    } else if (!data) {
        message.channel.send(`there is no custom prefix to start with, so the prefix is (\`**,**\`)`);


    }

}

module.exports.config = {
    name: "resetprefix",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["rprefix", "reset-prefix", "r-prefix"]
}