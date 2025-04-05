const modOptions = require('../../models/autoMod');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

  try{
    

    const data = await modOptions.findOne({
        GuildID: message.guild.id
    });

    if (!data) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

       else return message.channel.send(`auto-mod is already disabled`);
    }

    else if (data.Option === "off") {

    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

    else return message.channel.send(`auto-mod is already disabled`);

    }else if (data.Option === "on"){

    await modOptions.deleteOne({
            GuildID: message.guild.id
        })

    let newData = new modOptions({
            GuildID: message.guild.id,
            Option: "off"
        })
        newData.save();


    const data2 = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data2){

  let log = await message.guild.channels.cache.get(data2.ChannelID)
        if(log && log.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} disabled **auto mod**`)
          .setTimestamp();
          log.send(embed)
        }
    }


   if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

   else return message.channel.send(`auto-mod is now disabled!`);

    
  }
   } catch (e){
      console.log(e)
    }

}

module.exports.config = {
    name: "disablemod",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["disable-mod"]
}