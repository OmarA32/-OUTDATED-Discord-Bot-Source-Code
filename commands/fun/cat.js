const Discord = require('discord.js');
const { get } = require("snekfetch");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
        if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
          try {
          get('https://aws.random.cat/meow').then(res => {
            const cat = new Discord.MessageEmbed()
              .setImage(res.body.file)
            return message.channel.send(cat);
          });
        } catch (err) {
          return message.channel.send(err.stack);
        }
        
}

module.exports.config = {
    name: "cat",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: []
}