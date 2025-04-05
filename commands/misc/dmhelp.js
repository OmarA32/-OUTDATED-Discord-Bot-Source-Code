const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const prefix = botsettings.prefix;

module.exports.run = async (client, message, args) => {
  await message.react("✅")
  const helpdm = new Discord.MessageEmbed()
        .setTitle("**dm help**")
        .setColor("#985ce7")
        .setDescription(`by using these commands, you agree on:\nthe content of your message will be sent to our server regardless of what you wrote.\n\nand if you used the support command, your tag/name with your pfp and discord id, will be sent to our server too, to contact you if needed.\nthank you.`)
        .addFields(
          { name: '🪔 **__confessions__**', value: `add a channel called "\`🪔confessions\`" to your server then use:\n\n\`<${prefix}confession/${prefix}con> <server id> <your confession>\``},
          { name: '💡 **__support__**', value: `if you want any support, use:\n\`<${prefix}support/${prefix}sup> <the issue>\``},
          { name: '✅ **__other commands__**', value: `\`${prefix}suggestion <the suggestion>\`\n\`${prefix}invite\``},
        )
        .setTimestamp();
      message.author.send(helpdm)
}

module.exports.config = {
    name: "dmhelp",
    timeout: 1000,
    aliases: []
}