const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {

  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

  let messageArray = message.content.split(' ');
  let args2 = messageArray.slice(1);

  var filters = ["nigga","ñìgga", "niga","ñìga", "nigger","niggær", "ñìgger", "faggot", "nígger", "n1gg3r", "niger","nigær", "ñìger", "fagot", "níger", "n1g3r", "nugga", "nuga", "fag"];

    
     for (i = 0; i < filters.length; i++) {
       if (message.content.toLowerCase().includes(filters[i])) {
         return message.reply(`Dont make me say bad stuff!!!!!`)
       }
     }
     

  const channel = message.mentions.channels.first();
  const author = message.member;
  const guild = message.guild;

  if(channel){
    if(!channel.permissionsFor(author).has('SEND_MESSAGES'))return message.channel.send(`You dont have permission to send messages in there!`);

    if(!channel.permissionsFor(guild.me).has('SEND_MESSAGES'))return message.channel.send(`I dont have permission to send messages in there!`);

    const say = args2.slice(1).join(" ");

    if (!say)return message.channel.send(`Add something to say!`);

    channel.send(`${say}`)

  }else if(!channel){

    const say = args2.slice(0).join(" ");

    if (!say)return message.channel.send(`Add something to say!`);

    message.channel.send(`${say}`)
  }
       }
     
  


module.exports.config = {
    name: "say",
    timeout: 2000,
    aliases: []
}
