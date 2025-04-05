const Discord = require('discord.js');
const botsettings = require('../botsetting.json');
let prefix = botsettings.prefix;

module.exports.run = async (client, message, args) => {      
      let server = args[0];

      if(!server) return message.channel.send("You must add a server id!")

      if (isNaN(server)) return message.channel.send("You must add a valid server id! (number)")

      let foundserver = await client.guilds.cache.get(server);

      if (!foundserver)return message.channel.send("im not in that server.")

      
      let findchannel = await foundserver.channels.cache.find(i => i.name.toLowerCase() === '🪔confessions');

      if(!findchannel)return message.channel.send(`couldn't find a "\`🪔confessions\` channel"`)

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

      let content = args2.slice(1).join(" ");

      if(!content) return message.channel.send("You must add a confession to the message!")

     const log = await client.channels.cache.get(botsettings.confessionsID);

      
          let filter = m => m.author.id === message.author.id;
          

          const agreeembed = new Discord.MessageEmbed()

             .setColor("#985ce7")
             .setDescription("Do you agree on:\n**The bot sending the content of this message no matter what you wrote to the server you added?\n(without your name or pfp ofc)**\n\nAnswer with:\n\`(,yes/,y || ,no/,n)\`\n-you have 20s to answer!")
            .setTimestamp();
         
          message.channel.send(agreeembed);

          message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()

          
            if (message.content.toLowerCase() == `${prefix}yes` || message.content.toLowerCase() == `${prefix}y`) {

        
            
            
          const confessions = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setTitle("**confession...**")
            .setDescription(content)
            .setFooter('dm the bot with your confessions', botsettings.gif1)
            .setTimestamp();

          findchannel.send(confessions);
           
          
          message.author.send("done.");

          if(log) {
            const logEmbed = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setAuthor("confession")
          .setTitle(`${message.author.tag}, (\`${message.author.id}\`)`)
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .setDescription(content)
          .setTimestamp();

          log.send(logEmbed)
          }

          return;
            
            }
            else if (message.content.toLowerCase() == `${prefix}no` || message.content.toLowerCase() == `${prefix}n`) {
              message.author.send("ok.")
              return;
            }
        })
    
}

module.exports.config = {
    name: "confession",
    dmOnly: true,
    timeout: 15000,
    aliases: ['con']
}
