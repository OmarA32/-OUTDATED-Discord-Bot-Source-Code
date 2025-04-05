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

    var filters = ["nigger","niggær", "ñìgger", "faggot", "nígger", "n1gg3r", "niger","nigær", "ñìger", "fagot", "níger", "n1g3r", "nugga", "nuga", "fag"];

    
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