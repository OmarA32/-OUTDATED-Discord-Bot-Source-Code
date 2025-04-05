const prefix = require('../models/prefix');
const welcomeChannel = require('../models/welcomeChannel');
const byeChannel = require('../models/byeChannel');
const aiChannel = require('../models/aiChannel');
const levelschannel = require('../models/levelsChannel');
const modOptions = require('../models/autoMod');
const db = require('../models/warns');
const joinRole = require('../models/role');
const logChannel = require('../models/logs');
const levelsOptions = require('../models/levelsOptions');
const Levels = require('discord-xp');
const botsettings = require('../botsetting.json');
const Discord = require('discord.js');

module.exports = async (client, guild) => {
  
  console.log(`------removed guild-------`)
  console.log(`GUILD: (${guild.id})`)

  //--------- log it -------------

  const log = await client.channels.cache.get(botsettings.guildRemove)

    if(log){
      const logEmbed = new Discord.MessageEmbed()

      .setColor("#985ce7")
      .setTitle(`**${guild.name}**`)
      .setDescription(`left: **${guild.name}**\n\nID: \`${guild.id}\``)
      .setTimestamp();

    if(guild.iconURL()) logEmbed.setThumbnail(guild.iconURL({dynamic: true}));

    log.send(logEmbed)
    }

  //--------- prefix -------------

  const dataPrefix = await prefix.findOne({
        GuildID: guild.id
    });

  if(dataPrefix){
    prefix.findOneAndDelete({ GuildID : guild.id }).then(console.log('>prefix deleted data.'))
  }
    


  //--------- welcome -------------

  const dataWelcome = await welcomeChannel.findOne({
        GuildID: guild.id
    });

  if(dataWelcome){
    welcomeChannel.findOneAndDelete({ GuildID : guild.id }).then(console.log('>welcome channel deleted data.'))
  }
    

   //--------- byebye -------------

  const dataBye = await byeChannel.findOne({
        GuildID: guild.id
    });

  if(dataBye){
    byeChannel.findOneAndDelete({ GuildID : guild.id }).then(console.log('>bye Channel channel deleted data.'))
    }
    

   //--------- AiChat -------------

  const dataAiChat = await aiChannel.findOne({
        GuildID: guild.id
    });

  if(dataAiChat){
    aiChannel.findOneAndDelete({ GuildID : guild.id }).then(console.log('>ai Channel deleted data.'))
  }

  //-------- join role -----------

  const Role = await joinRole.findOne({
        GuildID: guild.id
    });

  if(Role){
    joinRole.findOneAndDelete({ GuildID : guild.id }).then(console.log('>join role deleted data.'))
  }

  //------- log channel ----------

  const Log = await logChannel.findOne({
        GuildID: guild.id
    });

  if(Log){
    logChannel.findOneAndDelete({ GuildID : guild.id }).then(console.log('>log channel deleted data.'))
  }
   
   //------- levels channel -----------

  const dataLevels = await levelschannel.findOne({
        GuildID: guild.id
    });

  if(dataLevels){
    levelschannel.findOneAndDelete({ GuildID : guild.id }).then(console.log('>levels channel deleted data.'))
  }
    

   //--------- auto-mod -------------

   const dataAutoMod = await modOptions.findOne({
        GuildID: guild.id
    });

  if(dataAutoMod){
    modOptions.findOneAndDelete({ GuildID : guild.id }).then(console.log('mod Options deleted data.'))
  }
    
   //-------- levels options -----------

  const dataLevelsOps = await levelsOptions.findOne({
        GuildID: guild.id
    });

  if(dataLevelsOps){
    levelsOptions.findOneAndDelete({ GuildID : guild.id }).then(console.log('>level ops deleted data.'))
  }
    

   //---------- warns --------------

  const dataWarns = await db.find({
     guildid: guild.id 
  })

  if(dataWarns){
    db.deleteMany({ guildid : guild.id }).then(console.log('>warns deleted data.'))
  }
    
    
  //---------- levels --------------

  try{
    Levels.deleteGuild(guild.id).then(console.log('>levels deleted data.'));
  }catch(e){
      return; 
  }
  
    
}