const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');



module.exports.run = async (client, message, args, prefix) => {
 
  try{
  let roles = new Discord.MessageEmbed()
        .setColor("#985ce7")
        .setTitle('Roles')
        .setAuthor(message.author.tag)
        .setURL('https://youtu.be/v3sd6QY_IRg')
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`📌 __**Adding/removing roles**__\n\n\`${prefix}addrole <user> <role>\`\n\`${prefix}removerole <user> <role>\`\n\n👋 **__JOINING ROLE__**\n\n\`${prefix}set-role <@role>\`\n\`${prefix}disable-role\`\n\nAny user that joins will get that role automatically\n\n🏅 **__REACTION ROLES/SELF ROLES__**\n\n\`${prefix}createrr <role> <emoji> <message id> <type>\`\n>To remove a role-emoji from a message:\n\`${prefix}deleterr <emoji> <message id>\`\n\n**Reaction Role Types(type):**\n> **NORMAL [1]** - This role works like basic reaction role.\n> **TOGGLE [2]** - You can win only one role of all toggle roles in this message (like colors system).\n> **JUST_WIN [3]** - This role you'll only win, not lose.\n> **JUST_LOSE [4]** - This role you'll only lose, not win.\n> **REVERSED [5]** - This is reversed role. When react, you'll lose it, when you take off reaction you'll win it.\n**use the number, not the name!**`)
        .setFooter(functions.footer(prefix), botsettings.gif1);
      message.channel.send(roles)
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "roles",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["role"]
}


