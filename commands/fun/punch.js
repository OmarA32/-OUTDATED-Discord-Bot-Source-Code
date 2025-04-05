const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

function doPunchAction() {
  var rand = [
    'https://cdn.weeb.sh/images/SJAfH5TOz.gif',
    'https://cdn.weeb.sh/images/SyYbP6W-z.gif',
    'https://cdn.weeb.sh/images/HkFlwpZZf.gif',
    'https://cdn.weeb.sh/images/SkFLH129z.gif',
    'https://cdn.weeb.sh/images/SJR-PpZbM.gif',
    'https://cdn.weeb.sh/images/HJqSvaZ-f.gif',
    'https://cdn.weeb.sh/images/ByI7vTb-G.gif',
    'https://cdn.weeb.sh/images/BJXxD6b-G.gif',
    'https://cdn.weeb.sh/images/rJHLDT-Wz.gif',
    'https://cdn.weeb.sh/images/HJfGPTWbf.gif',
    'https://cdn.weeb.sh/images/SJvGvT-bf.gif',
    'https://cdn.weeb.sh/images/rkkZP6Z-G.gif',
    "https://i.imgur.com/xmj8XRD.gif"


  ];

  return rand[Math.floor(Math.random() * rand.length)];
}


module.exports.run = async (client, message, args, prefix) => {

  let member = message.mentions.users.first();
  let author = message.author;
  
      try{

        if (!member) {
          let punch1 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setAuthor('kitten', 'https://i.imgur.com/BKbaUza.png')
            .setDescription(`**The kitten** *punches ${message.author} right in the nose*`)
            .setImage(doPunchAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(punch1);
        }
        

        else if (member) {
          if (author === member) {
             return message.channel.send("**NO**");
          } 

         else if (author !== member) { 
           let punch2 = new Discord.MessageEmbed()
            .setColor("#985ce7")
            .setDescription(`${message.author} *punches ${member} right in the nose*`)
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setImage(doPunchAction())
            .setFooter(`use (${prefix}fun) for more commands!`, botsettings.gif1);
          message.channel.send(punch2)
         }
        }
       
       
      
      
      }catch (e){
        console.log(e)
        return;
      }
    
}

module.exports.config = {
    name: "punch",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}