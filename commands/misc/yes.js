const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args, prefix) => {    

  message.channel.send(`yes, cipher`)
  
}

module.exports.config = {
    name: "yes",
    timeout: 1000,
    aliases: []
}