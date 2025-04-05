const txtgen = require('txtgen')
const weky = require('weky')
const botsettings = require('../../botsetting.json');



module.exports.run = async (client, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
  try{
const game = new weky.FastType({
    message: message,
    winMessage: "GG you won!", 
    sentence: txtgen.sentence(), 
    loseMessage: 'Lost ;(', 
    time: 20000, 
    startMessage: 'Good Luck!' 
   })
   game.start()
  }catch(e){
    return;
  }
}

module.exports.config = {
    name: "fasttype",
    timeout: 5000,
    aliases: ['fast']
}