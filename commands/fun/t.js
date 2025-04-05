const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');


function truth() {
    var rand = [
      "What's your least favourite song?",
      "Have you ever had a fantasy that wasn't exactly 'legal'?",
      "What's a skill you wish you had?",
      "What's the worst false rumor that you've heard spread?",
      "What's something you lose sleep over?",
      "What's the longest you've purposely left someone on read?",
      "Who is the easiest to talk to in this server?",
      "Have you ever snuck out of the house at night?",
      "What is your most embarrassing moment?",
      "If you had only $10 left to your name, how would you spend it?",
      "If you had to describe your body to someone else, what would you say?",
      "On a scale of 1-10, how awkward are you?",
      "What was the most physically painful experience of your life?",
      "What was your favorite childhood show?",
      "Have you ever skipped class/work, and if so, what did you do instead?",
      "Did you have an imaginary friend when you were growing up?",
      "Have you ever cheated in school?",
      "What's the worst thing you've ever said to your parents?",
      "What are you wearing?",
      "Do you play fortnite you fucking incel?",
      "Do you hate yourself? good.",
      "Women's rights?",
      "Whats the first video game you ever played?",
      "Ever did your mom?",
      "Have you ever been called ugly?",
      "What makes you happy?",
      "What's the stupidest thing you've ever done?",
      "What's your most useless skill?",
      "What do you want your parents not to find out about the most?",
      "What's the most embarrassing nickname you've ever had?",
      "Do you watch anime? DISGUSTING",
      "What's the stupidest thing you've done in front of someone?",
      "What's the most childish thing that you still do?",
      "What was the one thing you failed badly at?",
      "If you could go back in time and erase one thing you did in the past, what would it be?",
      "What is the most embarrassing song you listen to?",
      "Who would you kick out of the server if you could?",
      "What is your favorite game?",
      "Who is your favorite fictional character?",
      "If you could broadcast one thing to the world for 30 seconds, what would it be?",
      "If you could be reborn as any nationality, which one would you pick?",
      "What is your favourite anime? if you dont watch any..GOOD JOB",
      "What app do you hate, but use anyway?",
      "Do you simp for any fictional characters, and if so, who? and if it was me go fuck yourself incel!",
      "What is the most unique hobby you have?",
      "Ever felt useless? good.",
      "If you could add any bot to this server, what bot would you add?",
      "What is the craziest thing you've ever watched?",
      "What's the worst thing you can remember that's happened to you?",
      "Do you talk in your sleep?",
      "What's the last thing you searched for on your phone? you disgusting animal",
      "Did your step sis ever get stuck? if so, what did you do?",
      "Do you which to have both a penis and a pussy?"
      ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}



module.exports = {
  name: "t",
    description: "truth",
    cooldown: 300000,
    

    

    async run (client, message, args) {
      try{
      
      
    
        message.channel.send(truth());
      
        }catch(e){
      return;
    }
      
    }
    
     
}


module.exports.config = {
    name: "t",
    timeout: 1000,
    aliases: ['truth']
}