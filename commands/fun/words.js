const weky = require('weky')
let randomWords = require('random-words');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
   try{
  const word = randomWords()

  const game = new weky.ShuffleGuess({
              message: message,
              word: word, 
              winMessage: "GG you won!"
   }).catch(e => console.log(e));
 }catch(e){
   console.log(e)
    return;
  }
game.start().catch(e => console.log(e));
}

module.exports.config = {
    name: "words",
    timeout: 5000,
    aliases: ['shuffleguess']
}