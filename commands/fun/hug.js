const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

function doHugAction() {
  var rand = [
    'https://i.imgflip.com/4/39a10.jpg',
  ];

  return rand[Math.floor(Math.random() * rand.length)];
}


module.exports.run = async (client, message, args, prefix) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

  let member = message.mentions.users.first();
  let author = message.author;
   
     
        if (!member) {
          let hug1 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setDescription(`**The kitten** *Hugs* ${message.author}`)
            .setAuthor('kitten', 'https://i.imgur.com/BKbaUza.png')
            .setImage(doHugAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(hug1);
        }

        else if (member){

        if (author === member){
           return message.channel.send(`oh...damn..`);
        }

        else if (author !== member){
          let hug2 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setDescription(`${message.author} *Hugs* ${member}`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(doHugAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(hug2)
        }
        }

      
      
}

module.exports.config = {
    name: "hug",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}