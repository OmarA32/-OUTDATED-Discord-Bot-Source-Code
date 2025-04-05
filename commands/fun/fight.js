const weky = require('weky')
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  try{
  const author = message.author;

  const user = message.mentions.users.first();
  
  if(!user)return message.channel.send("you must ping a user");

  if(user.bot)return message.channel.send("you cant fight bots.")

  const x = new weky.fight({
    client: client,
    message: message,
    acceptMessage: `Click to fight with ${author}`, 
    challenger: author, 
    opponent: user 
  })
  x.start()
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "fight",
    timeout: 5000,
    aliases: []
}
