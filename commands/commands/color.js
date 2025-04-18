const pop = require("popcat-wrapper");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  
    let color = args[0];
    if(!color) return message.channel.send('Please provide a hex code!')
    if(color.includes("#")) {
      color = color.split("#")[1]
    }
    try {
    const info = await pop.colorinfo(color)
    
      const embed = new MessageEmbed()
      .setTitle("Color Info")
      .addField('Name', info.name, true)
      .addField('Hex', info.hex, true)
      .addField('RGB', info.rgb, true)
      .addField('Brighter Shade', info.brightened, true)
      .setImage(info.color_image)
      .setColor(info.hex)
      message.channel.send(embed)

    } catch (error) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

      return message.channel.send("Invalid Color!")
    }
  
} 

module.exports.config = {
    name: "color",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ["hex"]
}

