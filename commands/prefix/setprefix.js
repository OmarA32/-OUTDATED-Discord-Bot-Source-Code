const prefixModel = require("../../models/prefix")
const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
    

    if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You don't have enough permissions to change the prefix! only admins can.");

    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

    if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    });

    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: message.guild.id
        })
        
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
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
          .setDescription(`${message.author} changed the **prefix** to \`${args[0]}\``)
          .setTimestamp();
          log.send(embed)
        }
    }
    } else if (!data) {
        message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

        let newData = new prefixModel({
            Prefix: args[0],
            GuildID: message.guild.id
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
          .setDescription(`${message.author} changed the **prefix** to \`${args[0]}\``)
          .setTimestamp();
          log.send(embed)
        }
    }
    }

}

module.exports.config = {
    name: "setprefix",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["sprefix", "s-prefix", "set-prefix"]
}