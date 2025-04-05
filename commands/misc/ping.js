const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
        const pingEmbed = new Discord.MessageEmbed()
          .setTitle("Ping")
          .setDescription(`host = \`${Date.now() - message.createdTimestamp}ms\`\n API = \`${Math.round(client.ws.ping)}ms\``)
          .setColor("#985ce7")
        message.channel.send(pingEmbed);
        
    
  } catch (e) {
    return;
  }
}

module.exports.config = {
    name: "ping",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}

  