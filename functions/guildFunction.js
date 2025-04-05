const ms = require('ms');
const botsettings = require('../botsetting.json')
const Discord = require('discord.js');

async function guildFunction(client, message, prefix) {

    if (message.content === `${prefix}`) return;


  //-------------------args-------------------

    //const messageArray = message.content.split(' ');
    //const cmd = messageArray[0].toLowerCase();
    //const args = messageArray.slice(1);

  const messageArray = message.content.trim().split(/ +/g);
  const cmd = messageArray[0].toLowerCase();
  const args = messageArray.slice(1);

    
       let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))

      if (!commandfile) return;

        
     if(commandfile.config.dmOnly)return
     
       try{
        

      if(client.Timeout.has(`${commandfile.config.name}${message.author.id}`)){

        if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){ 

        return message.channel.send(`You are on a \`${ms(client.Timeout.get(`${commandfile.config.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)

        }else{
          return
        }

       } else {


         // owner only commands
         if(commandfile.config.owner && commandfile.config.owner === "true" && message.author.id !== botsettings.botOwner)return

         // no perms for bot (channel)
         if(commandfile.config.botChannelPermissions && !message.channel.permissionsFor(message.guild.me).has(commandfile.config.botChannelPermissions)){


           if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){

           return message.channel.send(`**I** don't have enough permissions:\n\`${commandfile.config.botChannelPermissions}\``)

           }else{
             return
           }
         }

        // no perms for user
         if(commandfile.config.userPermissions && !message.member.hasPermission(commandfile.config.userPermissions)){

           if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
             const permsUserEmbed = new Discord.MessageEmbed()
      .setTitle(`**You** don't have enough permissions:`)
      .setDescription(`\`${commandfile.config.userPermissions}\``)
      .setColor(`#985ce7`)


           return message.reply(permsUserEmbed)
           } else {
             return
           }
         }
         // no perms for bot
         if(commandfile.config.botPermissions && !message.guild.me.hasPermission(commandfile.config.botPermissions)){

           if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){

            const permsBotEmbed = new Discord.MessageEmbed()
      .setTitle(`**I** don't have enough permissions:`)
      .setDescription(`\`${commandfile.config.botPermissions}\``)
      .setColor(`#985ce7`)

           return message.reply(permsBotEmbed)
           }else{
             return
           }
         }

         
        

      if (commandfile) commandfile.run(client, message, args, prefix)

      
      

    client.Timeout.set(`${commandfile.config.name}${message.author.id}`, Date.now() + commandfile.config.timeout)
            setTimeout(() => {
                client.Timeout.delete(`${commandfile.config.name}${message.author.id}`)
            }, commandfile.config.timeout)
        }
         }catch(e){
           console.log(e)
          return;
        }
}

module.exports = {
    guildFunction
}