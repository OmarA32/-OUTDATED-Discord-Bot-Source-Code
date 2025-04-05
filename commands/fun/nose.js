const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
  

     const Result = `8${"=".repeat(Math.floor(Math.random() * 20))}D`
         
         const messageArray = message.content.split(' ');
         const args2 = messageArray.slice(1);
        

        const text = args2.slice(0).join(" ");

       if(!text){
          let ppembed = new Discord.MessageEmbed()
        .setTitle("nose inspection:")
        .setColor("#985ce7")
        .setDescription(`**${message.author}**'s nose is this long:\n\n${Result}`)
        message.channel.send(ppembed)
        }

        if (text.length > 25) return message.channel.send('up to \`25\` characters only!')
        
        
        
      
         if(text){
          let ppembed = new Discord.MessageEmbed()
        .setTitle("nose inspection:")
        .setColor("#985ce7")
        .setDescription(`**${text}**'s nose is this long:\n\n${Result}`)
        message.channel.send(ppembed)
         }
         
          
         
        
        
       
       
}
   

        

       
        



module.exports.config = {
    name: "pp",
    timeout: 1000,
    aliases: ["howbig"]
}
