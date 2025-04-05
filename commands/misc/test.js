const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const functions = require("../../functions");
const fetch = require("node-fetch").default;

module.exports.run = async (client, message, args) => {

 await fetch('https://www.reddit.com/gallery/pbm8wz').then((res) => {
   console.log(res)
 }).then(message.reply(`ok.`))
  

}

module.exports.config = {
    name: "test",
    timeout: 1000,
    aliases: [],
}