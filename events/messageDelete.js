const botsettings = require('../botsetting.json')
const prefix = botsettings.prefix;

module.exports = async (client, message) => {
  if(!message.guild || message.author.bot || message.author.id === "null") return;
  
  try{
  if(client.snipes.get(message.channel.id)) client.snipes.delete(message.channel.id)
   
  
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    member: message.member,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  

  
  }catch(e){
    
    return;
  }

  
}