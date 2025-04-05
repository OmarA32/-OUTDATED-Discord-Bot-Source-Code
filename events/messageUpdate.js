const botsettings = require('../botsetting.json')
const prefix = botsettings.prefix;

module.exports = async (client, message) => {
  try{

  if(!message.guild || message.author.bot || message.author.id === "null") return;

  if(client.editsnipes.get(message.channel.id)) client.editsnipes.delete(message.channel.id)

  client.editsnipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    member: message.member,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  }catch(e){
    return;
  }
   
}