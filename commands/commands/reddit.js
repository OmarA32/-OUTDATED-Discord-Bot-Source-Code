const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');
const redditFetch = require('reddit-fetch');

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  
  const reddits = args[0];
  if(!reddits)return message.channel.send(`Add a subreddit name!`);
    try{
    redditFetch({
    subreddit: reddits,
    sort: 'top',
    allowNSFW: false,
    allowModPost: true,
    allowCrossPost: false,
    allowVideo: false

   }).then(post => {
     try{
     
    let memeEmbed = new Discord.MessageEmbed()
        .setTitle(`${post.subreddit_name_prefixed}`)
        .setColor("#985ce7")
        .setDescription(`[${post.title}](https://www.reddit.com${post.permalink})`)
        .setFooter(`👍 ${post.ups || 0} 💬 ${post.num_comments || 0}`)
        message.channel.send(memeEmbed)
        message.channel.send(post.url)



     }catch(e){
       return message.channel.send(`Couldnt send the post! (error)`);
     }
   }).catch(() =>{
     return message.channel.send(`Couldnt find or enter that subreddit! (also nsfw subreddits are blocked!)`);
   });

   }catch (e) {
    return message.channel.send(`Couldnt find or enter that subreddit!`);
  }
}

module.exports.config = {
    name: "reddit",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 2000,
    aliases: ['r/']
}


