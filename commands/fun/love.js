const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  const messageArray = message.content.split(' ');
  const args2 = messageArray.slice(1);
  
        const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "⬜".repeat(loveIndex) + "⬛".repeat(10 - loveIndex);
         
        const author = message.author;
        
        const text = args2.slice(0).join(" ");


       if(!text)return message.channel.send("You must tag someone or add a name!1")


        if (text.length > 25) return message.channel.send('up to \`25\` characters only!')
        
         
        
          if(!text.includes(author.id)){
          let loveEmbed = new Discord.MessageEmbed()
        .setTitle("Love percentage")
        .setColor("#985ce7")
        .setDescription(`${message.author} loves **${text}** this much: **${love}%**\n\n${loveLevel}`)
        message.channel.send(loveEmbed)
          }
          else if(text.includes(author.id)){
             let loveEmbedidk = new Discord.MessageEmbed()
            .setTitle("Love percentage")
            .setColor("#985ce7")
            .setDescription(`${author} loves ${author} this much: **101%**\n\n⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\nwe all must love ourselves!`)
           message.channel.send(loveEmbedidk)
           }
           
        
        
        
       
}
   

        

       
        



module.exports.config = {
    name: "love",
    timeout: 1000,
    aliases: []
}
