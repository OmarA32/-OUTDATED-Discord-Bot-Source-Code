const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args) => {
  try{


        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send(new MessageEmbed()
            .setDescription(`User not found!`).setColor('#985ce7')
        )



        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {

            if(err) throw err;

            if(data) {

              const list = data.content.map((w, i) =>`\`${i + 1}\` | Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}\nReason: ${w.reason}`).join(`\n`);

             for(let i = 0; i < list.length; i += 2000) {

             const toSend = list.substring(i, Math.min(list.length, i + 2000));

             const finalList = new MessageEmbed()
             .setAuthor(message.member.user.tag, message.member.user.avatarURL({dynamic: true}))
             .setTitle(`${user.user.tag}'s warns`)
             .setDescription(toSend)
             .setColor("#947FFF")
             .setThumbnail(user.user.avatarURL({dynamic: true}))
              message.channel.send(finalList)
             
              }
   
            } else {
                 message.channel.send(new MessageEmbed()
            .setDescription(`That user doesnt have any warnings`).setColor('#985ce7')
        )
            }

        }).catch(e => console.log(e))
  }catch(e){
    console.log(e)
  }
}


module.exports.config = {
    name: "warnings",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["warnlist", "warns"]
}