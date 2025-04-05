const Discord = require('discord.js');
const botsettings = require('../botsetting.json');
let prefix = botsettings.prefix;
const moment = require('moment');

module.exports.run = async (client, message, args) => { 

  try{   

      const prefix2 = botsettings.prefix;  

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

      const content = args2.slice(0).join(" ");

      if(!content) return message.channel.send("You must add the issue you're having in the message!")

       const guild = client.guilds.cache.get(botsettings.guildID);

       const prefix = await client.prefix2(guild);

        if(!guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('i need more permissions on the server bruh, (admin)');

        const log = await client.channels.cache.get(botsettings.supportLogID);

      const category = await botsettings.parent; 

        const ch = guild.channels.cache.find(ch => ch.name === message.author.id)

        if(ch) {

      
        let filter = m => m.author.id === message.author.id;
           

           const agreeembed = new Discord.MessageEmbed()

             .setColor("#985ce7")
             .setDescription("Do you agree on:\n\n\n**1. The bot sending the content of this message no matter what you wrote to our server.**\n\n**2. the message will include your name/tag with your pfp to contact you when needed.**\n\nAnswer with:\n\`(,yes/,y || ,no/,n)\`\n\n-you have 20s to answer!")
            .setTimestamp();


          message.channel.send(agreeembed)

          message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()

            if (message.content.toLowerCase() == `${prefix2}n` || message.content.toLowerCase() == `${prefix2}no`) {
                message.author.send("ok.")
                return;
                
            
             }else if (message.content.toLowerCase() == `${prefix2}y` || message.content.toLowerCase() == `${prefix2}yes`) {



        const support = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(content)

          const support3 = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setTitle(`${message.author.tag}, (\`${message.author.id}\`)`)
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(content)
          



      ch.send(support);
        
        

         message.author.send("done.");

         if (log) log.send(support3)
        return;
       


             }
        })
      
       } else {
          let filter = m => m.author.id === message.author.id;
           

           const agreeembed = new Discord.MessageEmbed()

             .setColor("#985ce7")
             .setDescription("Do you agree on:\n\n\n**1. The bot sending the content of this message no matter what you wrote to our server.**\n\n**2. the message will include your name/tag with your pfp to contact you when needed.**\n\nAnswer with:\n\`(,yes/,y || ,no/,n)\`\n\n-you have 20s to answer!")
            .setTimestamp();


          message.channel.send(agreeembed)

          message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()

            if (message.content.toLowerCase() == `${prefix2}n` || message.content.toLowerCase() == `${prefix2}no`) {
                message.author.send("ok.")
                return;
                
            
             }else if (message.content.toLowerCase() == `${prefix2}y` || message.content.toLowerCase() == `${prefix2}yes`) {

        guild.channels.create(`${message.author.id}`, {
            type : 'text',
            parent : category,
            permissionOverwrites : [
                {
                    id : guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : client.user.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                },
                {
                    id : botsettings.botOwner,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                },
                {
                    id : "837011390002757683",
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                },
                {
                    id : "834688030605705218",
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {

          const support1 = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setAuthor(`SUPPORT`)
          .setTitle(`${message.author.tag}, (\`${message.author.id}\`)`)
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .setDescription(`> **user**\n${message.author.tag}\n\n> **id**\n${message.author.id}\n\n> **Account Creation**\n${moment.utc(message.author.createdAt).format("dddd, MMMM Do YYYY")}\n\n\n> **commands:**\n\`${prefix}respond-anonymous <your response>\`\n\`${prefix}close-anonymous <reason>\`\n\`${prefix}respond <your response>\`\n\`${prefix}close <reason>\``)
          .setTimestamp();

          const support = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(content)

          const support3 = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setTitle(`${message.author.tag}, (\`${message.author.id}\`)`)
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(content)
          



        channel.send(support1)
        channel.send(support);

        
        if (log) log.send(support3)

           return message.reply(`created a channel for the your mail and it got sent successfully`)
        }).catch(e => console.log(e))
        }
        }).catch(e => console.log(e))
        }
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "support",
    dmOnly: true,
    timeout: 30000,
    aliases: ['sup']
}
