const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const axios = require(`axios`);
const Canvacord = require("canvacord");


module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

  try{
      
     
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

        axios.get(`https://discord.com/api/users/${member.id}`, {
          headers: {
            Authorization: `Bot ${client.token}`
          },
        })
        .then(async (res) =>{
          const { banner, accent_color } = res.data;

          if(banner){

            const extension = banner.startsWith(`a_`) ? '.gif' : '.png';
            const url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=2048`

            const embed1 = new Discord.MessageEmbed()
            .setImage(url);

            if(accent_color){
               embed1.setTitle(`${member.user.username}'s banner, color: \`${accent_color}\``)
               embed1.setColor(accent_color)
            } 

            else if(!accent_color){
               embed1.setTitle(`${member.user.username}'s banner`)
               embed1.setColor('#985ce7')
            } 


            message.channel.send(embed1);

          } else {
            if(accent_color){

               const embed2 = new Discord.MessageEmbed()
               .setTitle(`${member.user.username}'s doesn't have a banner, but he has a color! (\`#${accent_color}\`)`)
               .setColor(accent_color)

              message.channel.send(embed2);

            } else {
              message.reply(`that user doesnt have a banner / color!`)
            }
          }
        }).catch((e) => console.log(e))  

  }catch(e){
    console.log(e)
  }    
}


module.exports.config = {
    name: "banner",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}
