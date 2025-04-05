const Levels = require('discord-xp');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const levelsOptions = require('../../models/levelsOptions');

module.exports.run = async (client, message, args) => {

     const data = await levelsOptions.findOne({
        GuildID: message.guild.id
    });

    if(!data || data.Option === "on"){

      const prefix = await client.prefix(message);
  

        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

          let history = leaderboard.map(user => `\`${user.position}\` - Lvl: **${user.level}** - ${user.username}#${user.discriminator} `).join("\n");


          const embed = new Discord.MessageEmbed()
            .setColor('"#947FFF"')
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setTitle(`**__The Leaderboard__**📄`)
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setDescription(history)
            .setFooter(`use (${prefix}help) for more info!`, client.user.avatarURL());

            message.channel.send(embed)
            
    }else if (data.Option === "off")return message.channel.send(`The leveling system is disabled on this server!`)
          

        
}


module.exports.config = {
    name: "lb",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ["leaderboard"]
}
