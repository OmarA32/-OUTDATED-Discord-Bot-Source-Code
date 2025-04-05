const db = require('../../models/warns')
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {


        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if(!user) return message.channel.send(new MessageEmbed()
            .setDescription(`User not found!`).setColor('#985ce7')
        )


        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Cleared ${user.user.tag}'s warns`)

                const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} removed all warns from ${user}`)
          .setTimestamp();
          log.send(embed)
        }
    }

            } else {
            message.channel.send(new MessageEmbed()
            .setDescription(`That user doesnt have any warnings`).setColor('#985ce7')
             )
            }
        })
}


module.exports.config = {
    name: "clearwarns",
    userPermissions: [`BAN_MEMBERS`],
    timeout: 1000,
    aliases: ["resetwarns", "rwarns", "rsetwarns"]
}