const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
let prefix = botsettings.prefix;

module.exports.run = async (client, message, args) => {


   if(message.channel.parent.id !== botsettings.parent)return message.reply(`this command is only allowed on the channels under the \`SUPPORT\` category!`)

   try{

      if (message.member.hasPermission("ADMINISTRATOR")) {

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);


      const content = args2.slice(0).join(" ");

      if(!content) return message.channel.send("add the respond.")

      const id = message.channel.name;
           
       
         const dm = client.users.cache.get(id);

         if(!dm)return message.channel.send(`user not found wtf.`)

        else if(dm){
           
        
             const updateembed = new Discord.MessageEmbed()
             .setTitle("response:")
             .setColor("RANDOM")
             .setAuthor(message.guild.name)
             .setThumbnail(message.guild.iconURL({ dynamic: true }))
             .setDescription(content)
             .setFooter(" ", client.user.avatarURL())
            .setTimestamp();
             dm.send(updateembed)

            message.reply("done.");
           
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
    name: "respond-anonymous",
    timeout: 1000,
    aliases: []
}