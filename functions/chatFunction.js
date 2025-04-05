const aiChannel = require('../models/aiChannel');
const botsettings = require('../botsetting.json')
const Discord = require('discord.js');

async function chatFunction(client, message, prefix) {

  if(!message.content)return
  const data = await aiChannel.findOne({
        GuildID: message.guild.id
     });

     if (!data)return;
 
      else if (data) {

      
       if(!message.channel.id === data.ChannelID)return;

       else if(message.channel.id === data.ChannelID && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){

        client.chatbot.chat(message.content).then(data => {
            message.channel.send(data)
          }).catch((e) => {
            return message.channel.send("couldn't fetch response [API], try again later.")
          })

       }else{ 
         return
       }
      }
}

module.exports = {
    chatFunction
}