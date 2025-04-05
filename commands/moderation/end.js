const Discord = require('discord.js');
const ms = require('ms')
const botsettings = require('../../botsetting.json');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

        if(!args[0]) return message.reply('Please specify a message id')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args.join(" "))

        if(!giveaway) return message.reply('Giveaway not found')

        client.giveaways.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        }).then(async ()  => {
            message.reply(`Giveaway wil end in less than ${client.giveaway.options.updateCountdownEvery / 1000} seconds`)

            const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} ended a giveaway`)
          .setTimestamp();
          log.send(embed)
        }
    }
        }).catch(err => {
            console.log(err)
            message.reply('An error occured')
        })
        
}

module.exports.config = {
    name: "end",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 3000,
    aliases: [`end-giveaway`]
}
