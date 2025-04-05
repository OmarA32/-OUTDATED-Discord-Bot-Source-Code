const db = require('../../models/warns')
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async(client, message, args) => {


        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send(new MessageEmbed()
            .setDescription(`User not found!`).setColor('#985ce7')
        )

        const thewarn = args[1];

        if(!thewarn)return message.channel.send('add the number of the warn.')

        if(isNaN(thewarn))return message.reply('you must add a valid number!')

        if(parseInt(thewarn) <= 0)return message.reply('you must add a valid number!')

        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {

            if(err) throw err;

            if(data) {

               let number = parseInt(thewarn) - 1
               const isdone = data.content.splice(number, 1)

                if (isdone) {

                  message.channel.send('deleted the warn')

                  data.save()

                  const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

      if(data2){

      let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} removed a warn from ${user}`)
          .setTimestamp();
          log.send(embed)
        }
       }

                }else if (!isdone){

                 return message.channel.send("Couldn't find that warn!")

                }

            } else {
                message.channel.send(new MessageEmbed()
            .setDescription(`That user doesnt have any warnings`).setColor('#985ce7')
        )
            }
        
        })
             

            
}

module.exports.config = {
    name: "removewarn",
    botChannelPermissions: [`EMBED_LINKS`],
    userPermissions: [`BAN_MEMBERS`],
    timeout: 1000,
    aliases: ["remove-warn"]
}  