const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const redditFetch = require('reddit-fetch');

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  try{
  const subReddits = ["dankmeme", "meme", "okbuddyretard"];
        
  const random = subReddits[Math.floor(Math.random() * subReddits.length)];
   redditFetch({

    subreddit: random,
    sort: 'top',
    allowNSFW: false,
    allowModPost: true,
    allowCrossPost: false,
    allowVideo: false

   }).then(post => {

    let memeEmbed = new Discord.MessageEmbed()
        .setTitle(`${post.subreddit_name_prefixed}`)
        .setColor("#985ce7")
        .setImage(post.url)
        .setDescription(`[${post.title}](https://www.reddit.com${post.permalink})`)
        .setFooter(`👍 ${post.ups} 💬 ${post.num_comments}`)
        message.channel.send(memeEmbed)
   });
     
    
   } catch (e) {
    return;
  }
}

module.exports.config = {
    name: "meme",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 2000,
    aliases: []
}
