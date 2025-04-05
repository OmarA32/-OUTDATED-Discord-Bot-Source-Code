const Levels = require('discord-xp');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const canvacord = require("canvacord");
const botsettings = require('../../botsetting.json');
const levelsOptions = require('../../models/levelsOptions');

module.exports.run = async (client, message, args) => {

  try{

    const data = await levelsOptions.findOne({
        GuildID: message.guild.id
    });

    if(!data || data.Option === "on"){
  
        const target = message.mentions.users.first() || message.author;

     const rankCard = await client.rankcard(target);

     const rankColor = await client.rankcolor(target);


        const user = await Levels.fetch(target.id, message.guild.id, true);

         

        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        if (!user) return message.channel.send("Seems like this user has not earned any xp so far.");

       const msg = await message.channel.send(`if the rank card didnt get send, try removing the cutom rank color and background.`)

        

       const rankcard = new canvacord.Rank()
       .setAvatar(target.displayAvatarURL({dynamic: false, format: 'png'}))
       .setCurrentXP(user.xp)
       .setRequiredXP(neededXp)
       .setStatus(target.presence.status)
       .setProgressBar(`#${rankColor}`)
       .setProgressBarTrack("#18191A", "color")
       .setUsername(target.username)
       .setDiscriminator(target.discriminator)
       .setRank(user.position, "Rank#", true)
       .setLevel(user.level, "Level")
       .renderEmojis(true)
       .setBackground("IMAGE", rankCard)
       
       rankcard.build().then(async (data) =>{
         const attachment = await new Discord.MessageAttachment(data, 'rank.png');
         

         
         message.channel.send(attachment).then(msg.delete())

         if (!message.channel) return;
       })
    }else if (data.Option === "off")return message.channel.send(`The leveling system is disabled on this server!`)
      

        
  }catch(e){
    console.log(e)
    return;
  }
        
}


module.exports.config = {
    name: "rank",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 1500,
    aliases: ["lvl", "level"]
}
