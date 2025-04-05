const Discord = require('discord.js');
const ms = require('ms')
const botsettings = require('../../botsetting.json');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {


   if(!args[0]) return message.channel.send('Please specify a message id')

        const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args[0]);
        if(!giveaway) return message.channel.send('Couldn\'t find the giveaway.')

        client.giveaways.reroll(giveaway.messageID)
            .then(async () => {
                message.channel.send("Giveaway rerolled");

                const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} reRolled a giveaway`)
          .setTimestamp();
          log.send(embed)
        }
    }
            })
            .catch(err => {
                console.log(err)
            })
}

module.exports.config = {
    name: "reroll",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 3000,
    aliases: []
}
