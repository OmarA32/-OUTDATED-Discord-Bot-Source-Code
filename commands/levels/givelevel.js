const Levels = require('discord-xp');
const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const levelsOptions = require('../../models/levelsOptions');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {


  try{

    const data = await levelsOptions.findOne({
        GuildID: message.guild.id
    });

    if(!data || data.Option === "on"){

     
  
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if(!target)return message.channel.send("mention a user or add his id!");

        const amount = args[1];

        if(!amount)return message.channel.send("add a valid level! (from 1 to 99).");

        if(isNaN(amount))return message.channel.send("add a valid number! (from 1 to 99).");

        if(parseInt(amount) > 99)return message.channel.send("add a valid number! (from 1 to 99).");

        const user = await Levels.fetch(target.id, message.guild.id, true);

        if (!user)Levels.createUser(target.id, message.guild.id)

        const neededXp = Levels.setLevel(target.id, message.guild.id, amount);

        const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} changed ${target}'s level to **${amount}`)
          .setTimestamp();
          log.send(embed)
        }
    }

       return message.channel.send(`changed ${target.user.tag}'s level to ${amount}.`);
       
    }else if (data.Option === "off")return message.channel.send(`The leveling system is disabled on this server!`)
      

        
  }catch(e){
    console.log(e)
    return;
  }
        
}


module.exports.config = {
    name: "givelevel",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["give-level"]
}
