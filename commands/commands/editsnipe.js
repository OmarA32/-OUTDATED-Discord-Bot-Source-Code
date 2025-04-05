const Discord = require('discord.js')
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  try{
    const msg = client.editsnipes.get(message.channel.id)
     if (!msg) return message.channel.send("There is nothing to editsnipe!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setColor("#985ce7")
    .setDescription(msg.content)
    .setFooter('Get Sniped lol')
    .setTimestamp();
    message.channel.send(embed);
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "editsnipe",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ["esnipe"]
}