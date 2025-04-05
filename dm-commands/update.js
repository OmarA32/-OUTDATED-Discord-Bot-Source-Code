const Canvas = require('canvas');
const Discord = require('discord.js');
const botsettings = require('../botsetting.json');
let prefix = botsettings.prefix;

module.exports.run = async (client, message, args) => {
  try{
        if (message.author.id !== botsettings.botOwner) {
        await message.react("❌") 
        return;

      }else if (message.author.id === botsettings.botOwner) {

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

      const content = args2.slice(0).join(" ");

      if(!content) return message.channel.send("add the update.")
           
       const guildList = client.guilds.cache.array();

        let numberOfServers = 0;

       guildList.forEach(guild => {
         const channel = guild.channels.cache.find(i => i.name.toLowerCase() === '📮bot-updates');

         if(channel && channel.permissionsFor(guild.me).has('SEND_MESSAGES')){
           
        
             const updateembed = new Discord.MessageEmbed()
             .setTitle("NEW UPDATE!")
             .setColor("#985ce7")
             .setAuthor(message.author.tag)
             .setThumbnail(message.author.avatarURL({ dynamic: true }))
             .setDescription(content)
             .setFooter('dm the bot if you need any support.', botsettings.gif1)
            .setTimestamp();
             channel.send(updateembed)


             numberOfServers++
         
           
         }
       })
       message.author.send(`done.\n\`${numberOfServers.toLocaleString()}\` servers.`)
          
        }
        }catch(e){
          return;
        }
}
    

module.exports.config = {
    name: "update",
    dmOnly: true,
    timeout: 1000,
    aliases: ['up']
}