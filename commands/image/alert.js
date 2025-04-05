const pop = require("popcat-wrapper");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  try{
    let text = args[0];
    if(!text) return message.channel.send('Please provide an alert message (text)!')

    

    const info = await pop.biden(text)

    const image = new Discord.MessageAttachment(info, "biden.png")
    message.channel.send(image)
  }catch(e){
    console.log(e)
  }
  
} 

module.exports.config = {
    name: "biden",
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 1500,
    aliases: []
}

