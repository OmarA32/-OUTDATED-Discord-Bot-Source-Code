const fetch = require("node-fetch").default;
const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

  if(!message.channel.nsfw)return message.reply(`this command can only work in NSFW channels!`)

   const wiki = args.slice().join(' ')
        if(!wiki) return message.reply('Provide A Query To Search.') // If Nothing Is Searched
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For It

        let response
        try {
            response = await fetch(url).then(res => res.json())
        }      
        catch (e) {
            return message.reply('An Error Occured, Try Again.')
        }

        try {
            if(response.type === 'disambiguation') { // If Their Are Many Results With Same Seached Topic
                const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setURL(response.content_urls.desktop.page)
                .setDescription([`
                ${response.extract}
                __**Links For Topic You Searched**__ [Link](${response.content_urls.desktop.page}).`]) // If Their Are Many Results With Same Seached Topic
                message.channel.send(embed)
            }
            else { // If Only One Result
                const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setThumbnail(response.thumbnail.source)
                .setURL(response.content_urls.desktop.page)
                .setDescription(response.extract)
                message.channel.send(embed)
            }
        }
        catch {
            return message.reply('Provide A Valid Query To Search.') // If Searched Query Is Not Available
        }
}

module.exports.config = {
    name: "wiki",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ['wikipedia', 'wikip']
}
