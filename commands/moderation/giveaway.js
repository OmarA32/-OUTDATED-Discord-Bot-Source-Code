const Discord = require('discord.js');
const ms = require('ms')
const botsettings = require('../../botsetting.json');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {

  try{
 
        
        const channel = message.mentions.channels.first();

        if(!channel) return message.reply('Please specify a channel')

        const duration = args[1];

        if(!duration) return message.reply('please enter a valid duration')

        const winners = parseInt(args[2]);

        if(!winners) return message.reply('Please specify an amount of winners')

        const messageArray = message.content.split(' ');
        const args2 = messageArray.slice(1);

        const prize = args2.slice(3).join(" ");

        if(!prize) return message.reply('Please sepcify a prize to win')

        client.giveaways.start(channel, {
            time : ms(duration),
            prize : prize,
            winnerCount: winners,
            hostedBy: message.author,
            messages: {
                giveaway: "Giveaway started!",
                giveawayEnd: "Giveaway Ended",
                timeRemaining: "Time Remaining **{duration}**",
                inviteToParticipate: "React with 🎉 to join the giveaway",
                winMessage: "Congrats {winners}, you have  won the giveaway",
                embedFooter: "Giveaway Time!",
                noWinner: "Could not determine a winner",
                hostedBy: 'Hosted by {user}',
                winners: "winners",
                endedAt: 'Ends at',
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: 'hours',
                    days: 'days',
                    pluralS: false
                }
            },
           
        }).catch(e => console.log(e))

        const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} made a giveaway in ${channel}`)
          .setTimestamp();
          log.send(embed)
        }
    }

        message.channel.send(`Giveaway is starting in ${channel}`)
  }catch(e){
    console.log(e)
  }
}

    
  


module.exports.config = {
    name: "giveaway",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 3000,
    aliases: []
}
