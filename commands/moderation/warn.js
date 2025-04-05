const db = require('../../models/warns')
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

  

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!user) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`User not found!`).setColor('#985ce7')
        )

        if(message.member === user)return message.channel.send('You cant warn yourself idiot.')

        if(message.guild.me === user)return message.channel.send(':/')

        if(user.hasPermission('ADMINISTRATOR')){
          return message.reply(`that user has admin C:`)
        }

        const messageArray = message.content.split(' ');
        const args2 = messageArray.slice(1);

        const reason = args2.slice(1).join(" ") || `no reason was given!`

        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {

            if(err) throw err;

            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Warned ${user} for: ${reason}`).setColor('#985ce7')
        )

        const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} warned ${user}`)
          .setTimestamp();
          log.send(embed)
        }
    }

        user.send(new Discord.MessageEmbed()
            .setDescription(`You have been warned!\nserver: ${message.guild.name}\nby: ${message.author.tag}\nfor: ${reason}`)
            .setColor("#985ce7")
        ).catch(e =>{
          message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Couldn't dm ${user} about his warn ❌`).setColor('#985ce7')
        )
        })
}

module.exports.config = {
    name: "warn",
    userPermissions: [`BAN_MEMBERS`],
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}
