const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
let prefix = botsettings.prefix;

module.exports.run = async (client, message, args) => {

  if(message.channel.parent.id !== botsettings.parent)return message.reply(`this command is only allowed on the channels under the \`SUPPORT\` category!`)

   try{

      if (message.member.hasPermission("ADMINISTRATOR")) {

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);


      const content = args2.slice(0).join(" ") || "no reason was provided";


      const id = message.channel.name;
           
       
         const dm = client.users.cache.get(id);

         if(!dm)return message.channel.send(`user not found wtf.`)

        else if(dm){

          const isdone = message.channel.delete();

          if(!isdone)return message.reply(`couldnt delete the channel!`)
           
        
             const updateembed = new Discord.MessageEmbed()
             .setTitle("CLOSED YOUR ISSUE:")
             .setColor("RANDOM")
             .setAuthor(message.author.tag)
             .setThumbnail(message.author.avatarURL({ dynamic: true }))
             .setDescription(content)
             .setFooter(" ", client.user.avatarURL())
            .setTimestamp();
             dm.send(updateembed)

           
         }
  } else {
    await message.react("❌") 
        return;
  }
   }catch(e){
     console.log(e)
   }
}

module.exports.config = {
    name: "close",
    timeout: 1000,
    aliases: []
}