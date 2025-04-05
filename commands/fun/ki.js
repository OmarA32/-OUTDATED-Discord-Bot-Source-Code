const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

function doKissAction() {
  var rand = [
    'https://c.tenor.com/eaDPAe9OLSoAAAAM/cat-kissing.gif'
  ];

  return rand[Math.floor(Math.random() * rand.length)];
}


module.exports.run = async (client, message, args, prefix) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

  let member = message.mentions.users.first();
  let author = message.author;
  try{
  
      if (message.content.includes("@here") || message.content.includes("@everyone")) return false;


        if (!member) {
          let love1 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setDescription(`**the kitten** *kisses* ${message.author}`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(doKissAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(love1)
          return;
        }
        
        else if (member){

        if (author === member) return message.channel.send(`oh...damn..`);

        else if (author !== member){
          let love2 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setDescription(`${message.author} *kisses* ${member}`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(doKissAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(love2)
        }

        }
  }catch(e){
    console.log(e)
  }
        
     
      
}

module.exports.config = {
    name: "kiss",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}