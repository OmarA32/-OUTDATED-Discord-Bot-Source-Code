const Discord = require('discord.js')
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {

  try{

 const rawEmoji = args[0];

 if(!rawEmoji){
   if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

   else return message.reply(`specify an emoji!`)
 }

 const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

 if(parsedEmoji.id) {
   const extension = parsedEmoji.animated ? ".gif" : ".png";
   const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

   const isdone = message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => {
     if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

     else message.channel.send(`\`Added:\` ${emoji}`)
   })

   if(!isdone){
     if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

     else return message.reply(`error.`);

   }

 } else {
   if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

   else return message.reply(`Couldn't find that emoji.`);
 }

  

 

  }catch(e){
    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

    else return message.reply(`couldnt add that emoji.`);
  }

}

module.exports.config = {
    name: "steal",
    userPermissions: [`MANAGE_EMOJIS`],
    botPermissions: [`MANAGE_EMOJIS`],
    timeout: 1000,
    aliases: []
}