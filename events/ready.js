const Discord = require("discord.js")
const botsettings = require('../botsetting.json')
const TopGG = process.env.TOPGG;
const discordBotList = process.env.DiscordBotList;
const discordBots = process.env.DiscordBots;
const axios = require(`axios`);
const { AutoPoster } = require('topgg-autoposter')
const fs = require('fs');

module.exports = async (client) => { 

  try{

  let commandsNumber = client.commands.size;


  
  const servers = await client.guilds.cache.size;
    
  const members = client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)

   const prefix = botsettings.prefix;

   const cipher = await client.users.cache.get(botsettings.botOwner); 
   
   client.user.setActivity(`(${prefix}help) || in ${servers.toLocaleString()} servers! || used by ${members.toLocaleString()} users! || ${commandsNumber} commands! || made by: (${cipher.tag})`)

   
    
    console.log(`---------ready!---------`);
    console.log(`${client.user.tag} is online!`);
    console.log(`------------------------`);


 

  axios.post(`https://discord.bots.gg/api/v1/bots/${botsettings.botID}/stats`, {
    guildCount: servers,
   }, {
    headers: {Authorization: discordBots}
  })

  axios.post(`https://discordbotlist.com/api/v1/bots/${botsettings.botID}/stats`, {
    guilds: servers,
    users: members,
   }, {
    headers: {Authorization: discordBotList}
  })

  axios.post(`https://top.gg/api/bots/${botsettings.botID}/stats`, {
    server_count: servers,
   }, {
    headers: {Authorization:TopGG}
  })

  


  setInterval(async () => {

    let commandsNumber = client.commands.size + client.dmcommands.size;

  

    const servers = await client.guilds.cache.size;
    
    const members = await client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)

   const prefix = botsettings.prefix;

   const cipher = await client.users.cache.get(botsettings.botOwner); 
   
   client.user.setActivity(`(${prefix}help) || in ${servers.toLocaleString()} servers! || used by ${members.toLocaleString()} users! || ${commandsNumber} commands! || made by: (${cipher.tag})`)
    }, 240000)

  const channel = await client.channels.cache.get(botsettings.readyChannel)

  const channel2 = await client.channels.cache.get(botsettings.readyChannel2)

  if(!channel && !channel2)return;

  const onlineembed = new Discord.MessageEmbed()
    .setTitle("THE BOT IS ONLINE.")
   .setDescription(`-in **${servers}** server.\n-used by **${members.toLocaleString()}** users.`)
   .setColor("#985ce7")
   .setTimestamp();

  if (channel) channel.send(onlineembed)
  if (channel2) channel2.send(onlineembed)



  }catch(e){
    console.log(e);
  }
    
};


