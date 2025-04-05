const Discord = require('discord.js');

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'],
  restTimeOffset: 0,
  disableMentions: 'everyone',
});

require('dotenv').config();

//-------------------npms-------------------


const fetch = require("node-fetch").default;
const mongoCurrency = require('discord-mongo-currency');
const DisTube = require('distube');
const db = require('quick.db');
const { get } = require("snekfetch");
const fs = require("fs");
const Levels = require('discord-xp');
const mongoose = require('mongoose');
const moment = require('moment');
const ms = require('ms');
const canvacord = require("canvacord");
const Canvas = require("canvas");
const { ReactionRoleManager } = require('discord.js-collector');
const express = require('express');
const weky = require('weky');
const txtgen = require('txtgen');
const randomWords = require('random-words');
const redditFetch = require('reddit-fetch');
const Chatbot  =  require("discord-chatbot");
const { AutoPoster } = require('topgg-autoposter')
const axios = require(`axios`);
const { GiveawaysManager } = require('discord-giveaways');
const pop = require("popcat-wrapper");

//-------------------logins-------------------


const mySecret = process.env.DISCORD_TOKEN;
const MongoDBlink = process.env.MongoDB;
const MyChatApi = process.env.chatapi;
const TopGG = process.env.TOPGG;
const discordBotList = process.env.DiscordBotList;
const discordBots = process.env.DiscordBots;


//-------------------misc stuff-------------------

const KeepAlive = require('./server.js');
const botsettings = require('./botsetting.json');
const radio = require("./radio");
const functions = require('./functions.js');

//-------------------cool down-------------------

client.Timeout = new Discord.Collection();

//--------------------prefixs--------------------

const oldprefix = botsettings.prefix;
const prefix = require('./models/prefix');

//-------------------mongoose db-------------------


mongoose.connect(MongoDBlink, { useNewUrlParser: true, useUnifiedTopology: true, })

Levels.setURL(MongoDBlink, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);

mongoCurrency.connect(MongoDBlink, { useNewUrlParser: true, useUnifiedTopology: true });


//-------------------command handler-------------------
require('./util/loadEvents')(client);


const { loadCommands } = require('./util/loadcommands');
const { loaddmCommands } = require('./util/loaddmcommands');



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();
client.editsnipes = new Discord.Collection();


loadCommands(client);
loaddmCommands(client);




//-------------------reactions-------------------

client.reactionRoleManager = new ReactionRoleManager(client, {
  storage: true,
  mongoDbLink: MongoDBlink,

});

client.reactionRoleManager
     .on('reactionRoleAdd', (member, role) => {
  console.log(member.displayName + ' won the role' + role.name)
   })
   .on('reactionRoleRemove', (member, role) => {
  console.log(member.displayName + ' lose the role' + role.name)
   })
   .on('allReactionsRemove', (message) => {
  console.log(`All reactions from message ${message.id} was removed, all roles was taken and reactions roles deleted.`)
    })
    .on('missingRequirements', (type, member, reactionRole) => {
  console.log(`Member '${member.id}' will not win role '${reactionRole.role}', because him hasn't requirement ${type}`);
   })
   .on('missingPermissions', (action, member, roles, reactionRole) => {
  console.log(`Some roles cannot be ${action === 1 ? 'given' : 'taken'} to member \`${member.displayName}\`, because i don't have permissions to manage these roles: ${roles.map(role => `\`${role.name}\``).join(',')}`);
});



//-------------------distube-------------------



client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  highWaterMark: 50 * 1024 * 1024, 
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  searchSongs: false,
  updateYouTubeDL: false,
  customFilters:
  {
    "clear": "dynaudnorm=f=200",
    "bassboost": "bass=g=20,dynaudnorm=f=200",
    "8d": "apulsator=hz=0.08",
    "vaporwave": "aresample=48000,asetrate=48000*0.8",
    "nightcore": "aresample=48000,asetrate=48000*1.25",
    "phaser": "aphaser=in_gain=0.4",
    "purebass": "bass=g=20,dynaudnorm=f=200,asubboost",
    "tremolo": "tremolo",
    "vibrato": "vibrato=f=6.5",
    "reverse": "areverse",
    "treble": "treble=g=5",
    "surrounding": "surround",
    "pulsator": "apulsator=hz=1",
    "subboost": "asubboost",
    "karaoke": "stereotools=mlev=0.03",
    "flanger": "flanger",
    "gate": "agate",
    "haas": "haas",
    "mcompand": "mcompand"
  }
})

let stateswitch = false;

const filters = [
    "mcompand",
    "gate",
    "haas",
    "pulsator",
    "surrounding",
    "clear",
    "8d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
    "subboost",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "purebass",
    "treble"
];

client.distube
  .on("playSong", async (message, queue, song) => {
    try {
      message.channel.send(`**Playing** 🎶 \`${song.name}\`, Now!`)
    } catch (error) {
     console.log(error)
      return;
    }
  })
  .on("addSong", (message, queue, song) => {
    try {
      return functions.embedbuilder(client, message, "#985ce7", "Added a Song!", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n\nEstimated Time: ${queue.songs.length - 1} song(s) - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`\nQueue duration: \`${queue.formattedDuration}\``, song.thumbnail)
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("playList", (message, queue, playlist, song) => {
    try {
      const playlistembed = new Discord.MessageEmbed()
       .setTitle(`Playling playlist`)
       .setDescription(`Playlist: [\`${playlist.name}\`](${playlist.url})\n\n\`${playlist.songs.length}\` songs.\nRequested by: ${song.user}`)
       .setThumbnail(playlist.thumbnail)
       .setColor("#985ce7");

      message.channel.send(playlistembed)
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("addList", (message, queue, playlist, song) => {
    try {
      return functions.embedbuilder(client, message, "#985ce7", "Added a Playlist!", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}`, playlist.thumbnail)
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("searchResult", (message, result) => {
    try {
      if(result){
      let i = 0;
      return functions.embedbuilder(client, message, "#985ce7", "", `**Choose an option from below**\n${result.map(song => `**\`${++i}\`**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)

      }else if (!result){
      return message.channel.send(`No results found.`)
      }

    } catch (error) {
      return message.channel.send("found no results!")
    }
  })
  .on("searchCancel", (message) => {
    try {
      message.reactions.removeAll();
      message.react("❌")
    } catch (error) {
      console.log(error)
      return;

    }
    try {
      return functions.embedbuilder(client, message, "#985ce7", `Searching canceled`, "")
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("error", message => {
    return;
  })
  .on("finish", message => {
    
    try {
      return message.channel.send("⚰ **left the voice channel, There are no more songs left**")
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("empty", message => {
    
    try {
      return message.channel.send("🔈 **Left the channel because it got empty!**")
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("noRelated", message => {
    try {
      return functions.embedbuilder(client, message, "#985ce7", "Can't find related video to play. Stop playing music.")
    } catch (error) {
      console.log(error)
      return;
    }
  })
  .on("initQueue", queue => {
    try {
    queue.autoplay = false;
      queue.volume = 69;
      queue.filter = filters[5];
    } catch (error) {
      console.log(error)
      return;
    }
});

//---------------------giveaways---------------------

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        embedColor: '#985ce7',
        embedColorEnd: '#985ce7',
        reaction: '🎉'
    }
});

client.giveaways = manager;

//---------------------chat ai------------------------


client.chatbot = new Chatbot({name: "kitten", gender: "Female"});



//-------------------token and link-------------------

KeepAlive()



client.login(mySecret)

//-----------------------prefix-----------------------

client.prefix = async function(message) {    
    let custom;

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });
    

    if (data) {
        custom = data.Prefix;
    }else if(!data){
        custom = botsettings.prefix;
    } return custom;
}


client.prefix2 = async function(guild) {    
    let custom;

    const data = await prefix.findOne({
        GuildID: guild.id
    });
    

    if (data) {
        custom = data.Prefix;
    }else if(!data){
        custom = botsettings.prefix;
    } return custom;
}




//-------------------handle error-------------------

process.on('unhandledRejection', async (err) => {
    if (client.user) {
        if (client.user.id === '822005340689530911') {
            const errEmbed = new Discord.MessageEmbed().setTitle('unhandledRejection Error').setDescription(err.stack, { code: 'ini' }).setTimestamp();
            return;
        }
    }else{
    return;
    }
});



//----------------------statics----------------------



setInterval(async () => {

  await fetch('')


  console.log(`---------------------------`)

  let servers = await client.guilds.cache.size;

  const users = await client.users.cache.size;


  

   axios.post(`https://discord.bots.gg/api/v1/bots/${botsettings.botID}/stats`, {
    guildCount: servers,
   }, {
    headers: {Authorization: discordBots}
   }).then(console.log(`discord bots ✅`)).then(


   axios.post(`https://discordbotlist.com/api/v1/bots/:${botsettings.botID}/stats`, {
    guilds: servers,
    users: users,
   }, {
    headers: {Authorization: discordBotList}
   })).then(console.log(`discord bot list ✅`)).then(

   axios.post(`https://top.gg/api/bots/${botsettings.botID}/stats`, {
    server_count: servers,
   }, {
    headers: {Authorization: TopGG}
  }).then(console.log(`topgg ✅`)))
  
}, 240000)

//-------------------coins economy xd-------------------

const economy1 = require('./models/economy');

client.add = async (id, coins) => {
  try{

  const data = await economy1.findOne({
    ID: id,
    });

  if(data){

       data.Coins += coins
       data.save();

    } else {

     const newdata = new economy1({
       ID: id, 
       Coins: coins,
       Bank: 0,
       Limit: 50000,
       });

      newdata.save();
    }
  }catch(e){
  console.log(e)
  }
}

client.addBank = async (id, coins) => {
  try{

  const data = await economy1.findOne({
    ID: id,
    });

  if(data){

       data.Bank += coins
       data.save();

    } else {
     return
    }
  }catch(e){
  console.log(e)
  }
}

client.addBankLimit = async (id, coins) => {
  try{

  const data = await economy1.findOne({
    ID: id,
    });

  if(data){

       data.Bank += coins
       data.save();

    } else {
     return
    }
  }catch(e){
  console.log(e)
  }
}

client.removeBank = async (id, coins) => {
  try{

  const data = await economy1.findOne({
    ID: id
    });

  if(data){

       data.Bank -= coins
       data.save();

    } else {

     return;

    }
    }catch(e){
  console.log(e)
   }  
}

client.remove = async (id, coins) => {
  try{

  const data = await economy1.findOne({
    ID: id
    });

  if(data){

       data.Coins -= coins
       data.save();

    } else {

     const newdata = new economy1({
       ID: id, 
       Coins: -coins,
       Bank: 0,
       Limit: 50000,
       })
       newdata.save();

    }
    }catch(e){
  console.log(e)
   }  
}

client.bal = async (id) => new Promise(async ful =>{
  try{
  const data = await economy1.findOne({
    ID: id,
    });

  if(!data) return ful(0);

  ful(data.Coins)

  }catch(e){
  console.log(e)
  }

})

client.bank = async (id) => new Promise(async ful =>{
  try{
  const data = await economy1.findOne({
    ID: id,
    });

  if(!data) return ful(0);

  ful(data.Bank)

  }catch(e){
  console.log(e)
  }

})

client.bankLimit = async (id) => new Promise(async ful =>{
  try{
  const data = await economy1.findOne({
    ID: id,
    });

  if(!data) return ful(50000);

  ful(data.Limit)

  }catch(e){
  console.log(e)
  }

})

//---------- rank ---------------

const rankCard = require('./models/rankcard');

client.rankcard = async function(target) {    
    let custom;

    const data = await rankCard.findOne({
        MemberID: target.id
    });
    

    if (data) {
        custom = data.Link;
    }else if(!data){
        custom = botsettings.rank;;
    } return custom;
}

const rankColor = require('./models/rankColor');

client.rankcolor = async function(target) {    
    let custom;

    const data = await rankColor.findOne({
        MemberID: target.id
    });
    

    if (data) {
        custom = data.Color;
    }else if(!data){
        custom = botsettings.color;
    } return custom;
}