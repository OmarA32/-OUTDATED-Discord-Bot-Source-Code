const botsettings = require('../botsetting.json');
const oldprefix = botsettings.prefix;
const afkFunction = require('../functions/afkFunction');
const automodFunction = require('../functions/automodFunction');
const levelsFunction = require('../functions/levelsFunction');
const chatFunction = require('../functions/chatFunction');
const dmFunction = require('../functions/dmFunction');
const guildFunction = require('../functions/guildFunction');

// ----------- message ------------

module.exports = async (client, message) => {
  try{

  if (message.author.bot) return;

  if (!message.guild) {

    let prefix = botsettings.prefix;

    dmFunction.dmFunction(client, message, prefix)
    
  }

  //-------------------servers-------------------

  else if (message.guild) {

    //-------------------prefix data-------------------
    
   const prefix = await client.prefix(message);

    //-------------------leveling-------------------
    
    levelsFunction.levelsFunction(client, message, prefix)

    //----------- auto mod ------------
    
    automodFunction.automodFunction(client, message, prefix)

    // ----------  AFK STUFF  ----------
   
     afkFunction.afkFunction(client, message, prefix)

   //-------------------chat ai-------------------
    
     if (!message.content.startsWith(prefix)) {

       if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)) && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send(`the Kitten's Prefix is (\`${prefix}\`)\n\nTo get a list of commands, use \`${prefix}help\``);

      else chatFunction.chatFunction(client, message, prefix);
    
     }

    //-------------------commands-------------------

     else if (message.content.startsWith(prefix)) {

       guildFunction.guildFunction(client, message, prefix);
     }
    }
    }catch(e){
      return
  }
}