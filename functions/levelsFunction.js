const levelschannel = require('../models/levelsChannel');
const levelsOptions = require('../models/levelsOptions');
const botsettings = require('../botsetting.json');
const Levels = require('discord-xp');
const Discord = require('discord.js');

async function levelsFunction(client, message, prefix) {

  const datalevels = await levelsOptions.findOne({
        GuildID: message.guild.id
    });

    if(!datalevels || datalevels.Option === "on"){

    const randomXp = Math.floor(Math.random() * 9) + 1; 
    
    //Random amont of XP until the number you want + 1

    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);

    if (hasLeveledUp) {

      const user = await Levels.fetch(message.author.id, message.guild.id);

      const leveledup = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setAuthor('LEVEL UP', message.author.avatarURL({ dynamic: true }))
        .setDescription(`hey ${message.author}! you leveled up to lvl ${user.level}! Keep it going!`)
        .setThumbnail('https://media1.giphy.com/media/Wt7u1mKdpNOPoAKVkn/200w.gif?cid=82a1493bgib5osdl3kyfki3dujtzk96xv9rbkvf99rlo3ce3&rid=200w.gif')
        .setFooter(`use (${prefix}levels) for more info!`, 'https://i.pinimg.com/originals/bc/55/51/bc5551ac237a9ef4d8e9575662f2e106.gif');

        const datachannel = await levelschannel.findOne({
        GuildID: message.guild.id
      });

      if(!datachannel && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){

      message.channel.send(leveledup);


      }

      else if(datachannel){

        const lvlchannel = client.channels.cache.get(datachannel.ChannelID);

        if (!lvlchannel && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){

        await levelschannel.deleteOne({
            GuildID: message.guild.id
        })

       return message.channel.send(leveledup);

        }else if(lvlchannel && lvlchannel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){

        return lvlchannel.send(leveledup)

        }
    }
    }
    }
}

module.exports = {
    levelsFunction
}