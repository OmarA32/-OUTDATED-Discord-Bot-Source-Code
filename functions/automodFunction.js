const botsettings = require('../botsetting.json');
const Discord = require('discord.js');
const modOptions = require('../models/autoMod');

async function automodFunction(client, message, prefix) {
  
     const dataAutoMod = await modOptions.findOne({
        GuildID: message.guild.id
    });

    if(!dataAutoMod)return

    if(dataAutoMod && dataAutoMod.Option === "on"){

    if (message.member.hasPermission(["ADMINISTRATOR"]))return

     //---------- bad word ------------

    var filters = [];

    
     for (i = 0; i < filters.length; i++) {
       if (message.content.toLowerCase().includes(filters[i])) {
      await message.delete();
     
       if(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))message.channel.send(`${message.author} you said swer!!`)

    }
     }
    }
    
}

module.exports = {
    automodFunction
}