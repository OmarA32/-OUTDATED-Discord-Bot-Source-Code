const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

function doFuckAction() {
  var rand = [
    'https://i.imgur.com/vriqX3c.gif',
    'https://i.imgur.com/kNCtPBy.gif',
    'https://i.imgur.com/x9T2Hh3.gif'
  ];

  return rand[Math.floor(Math.random() * rand.length)];
}

module.exports.run = async (client, message, args, prefix) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

  let member = message.mentions.users.first();
  let author = message.author;
 
      
        if (!member) {
          let fuck = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setAuthor('kitten', 'https://i.imgur.com/BKbaUza.png')
            .setDescription(`__**The kitten**__ *Fucks* ${message.author}`)
            .setImage(doFuckAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(fuck);
        }

        else if (member){

        if (author === member){ return message.channel.send("wait what");
        }
        
        else if (author !== member){
          let fuck2 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setDescription(`${message.author} *Fucks* ${member}`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(doFuckAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(fuck2)
        }
        
        }
      
}

module.exports.config = {
    name: "fuck",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}