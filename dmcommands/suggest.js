const Discord = require('discord.js');
const botsettings = require('../botsetting.json');
let prefix = botsettings.prefix;

module.exports.run = async (client, message, args) => { 

  try{   

    const channel = client.channels.cache.get(botsettings.suggestionsID);

    const log = await client.channels.cache.get(botsettings.suggestionsLogID);

      if(!channel) return;

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

      const content = args2.slice(0).join(" ");

      if(!content) return message.channel.send("You must write a suggestion you know.. type something!")

       


        if(!channel.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('i need more permissions on the server bruh, (admin)');



        const suggestion = new Discord.MessageEmbed()
          .setColor("#985ce7")
          .setAuthor("suggestion")
          .setTitle(`${message.author.tag}, (\`${message.author.id}\`)`)
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .setDescription(content)
          .setTimestamp();



      channel.send(suggestion);
        
        

         message.author.send("done.");

         if(log) log.send(suggestion);

        return;
      
  }catch(e){
    return
  }
}

module.exports.config = {
    name: "suggest",
    dmOnly: true,
    timeout: 30000,
    aliases: ['suggestion']
}
