const Discord = require('discord.js');


function dare() {
    var rand = [
      "Serenade the person to your right.",
      "Talk in an accent for the next 3 rounds.",
      "Attempt to do a magic trick.",
      "Do four cartwheels in row.",
      "Eat five tablespoons of a condiment.",
      "Be someone’s pet for the next 5 minutes.",
      "Attempt to break dance for 30 seconds.",
      "Let the group give you a new hairstyle.",
      "Curse like sailor for 20 seconds straight.",
      "Dance to a song of the group’s choosing.",
      "Put 4 ice cubes down your pants.",
      "Lick the floor.",
      "Dance with no music for 1 minute.",
      "Play a song on by slapping your butt cheeks till someone guesses the song.",
      "Do pushups until you can’t do any more, wait 5 seconds, and then do one more.",
      "Imitate a celebrity every time you talk for three minutes.",
      "Imitate popular YouTube videos until someone can guess the video you are imitating.(i dont fucking know..)",
      "Compose a poem on the spot based on something the group comes up with.",
      "Imagine something in your room. Now spell it with your nose and keep spelling it with your nose until someone from the group guesses what you are trying spell.",
      "Drag your butt on the carpet like a dog from one end of the room to the other.",
      "Make a tea out of something that isn’t tea (but is NOT dangerous or toxic) and drink it.",
      "Go to the bathroom, take off your underwear and put it on your head. Wear it on your head for 10 minutes."
      ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}



module.exports = {
  name: "d",
    description: "dare",
    cooldown: 300000,
    

    

    async run (client, message, args) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
      try{
      

      message.channel.send(dare());
   
        }catch(e){
      return;
    }
      
    }
    
     
}


module.exports.config = {
    name: "d",
    timeout: 1000,
    aliases: ['dare']
}