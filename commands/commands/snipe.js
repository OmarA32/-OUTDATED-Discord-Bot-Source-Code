const Discord = require('discord.js')
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
  
    const msg = client.snipes.get(message.channel.id)
    if (!msg) return message.channel.send("There is nothing to snipe!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setColor("#985ce7")
    .setDescription(msg.content)
    .setFooter('Get Sniped lol')
    .setTimestamp();
    if (msg.image) embed.setImage(msg.image)
    message.channel.send(embed);
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "snipe",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}