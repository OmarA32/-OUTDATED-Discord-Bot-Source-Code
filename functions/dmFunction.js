const ms = require('ms');
const botsettings = require('../botsetting.json')
const Discord = require('discord.js');

async function dmFunction(client, message, prefix) {


   try{

    if (!message.content.startsWith(prefix)) {
      
              
      if(client.Timeout.has(`autodmhelp${message.author.id}`)){ 

        return 

      } else {

      const helpdm = new Discord.MessageEmbed()
        .setTitle("**dm help**")
        .setColor("#985ce7")
        .setDescription(`by using these commands, you agree on:\nthe content of your message will be sent to our server regardless of what you wrote.\n\nand if you used the support command, your tag/name with your pfp and discord id, will be sent to our server too, to contact you if needed.\nthank you.`)
        .addFields(
          { name: '🪔 **__confessions__**', value: `add a channel called "\`🪔confessions\`" to your server then use:\n\n\`<${prefix}confession/${prefix}con> <server id> <your confession>\``},
          { name: '💡 **__support__**', value: `if you want any support, use:\n\`<${prefix}support/${prefix}sup> <the issue>\``},
          { name: '✅ **__other commands__**', value: `\`${prefix}suggestion <the suggestion>\``},
        )
        .setTimestamp();
      message.author.send(helpdm)


      client.Timeout.set(`autodmhelp${message.author.id}`, Date.now() + 30000)
            setTimeout(() => {
                client.Timeout.delete(`autodmhelp${message.author.id}`)
            }, 30000)
    }
    return;

  }else if (message.content.startsWith(prefix)) {

    //const messageArray = message.content.split(' ');
    //const cmd = messageArray[0].toLowerCase();
    //const args = messageArray.slice(1);

   const messageArray = message.content.trim().split(/ +/g);
   const cmd = messageArray[0].toLowerCase();
   const args = messageArray.slice(1);
    

    let dmcommandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

    if (!dmcommandfile) return;

    if(!dmcommandfile.config.dmOnly)return

    if(client.Timeout.has(`${dmcommandfile.config.name}${message.author.id}`)){ 

        return message.channel.send(`You are on a \`${ms(client.Timeout.get(`${dmcommandfile.config.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)

      } else {

    if (dmcommandfile) dmcommandfile.run(client, message, args)
      

    client.Timeout.set(`${dmcommandfile.config.name}${message.author.id}`, Date.now() + dmcommandfile.config.timeout)
            setTimeout(() => {
                client.Timeout.delete(`${dmcommandfile.config.name}${message.author.id}`)
            }, dmcommandfile.config.timeout)
        }
  }
       
   }catch(e){
     return;
   }
}

module.exports = {
    dmFunction
}