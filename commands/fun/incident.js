const Discord = require('discord.js');
const botsettings = require('../../botsetting.json');

function incident() {
    var rand = [
        "**The Chungus Incident**\nI lay on the bed, eagerly waiting. The door swings open revealing the marvelous sillhoette of Big Chungus. I grin as his throbbing 12 inch rabbit cock begins to twitch. Chungus darts across the room toward the bed, he throws me to my knees and drives a carrot up into my rectal cavity. A satisfied moan escapes my mouth, which is now being probed by Chungus' stinky thick rod. Before I know it, Chungus has slid himself into my oesophagus, my neck widens, I can't breathe. I fight the urge to vomit as I feel the bitter warm fluid from Chungus' cock cascade into my stomach. As I begin to lose conciousness, I take one last look at Chungus' kind face, he smiles, I am satisfied.",

        "**The December 2018 'Tomato Town' Incident**\nAt around 10:00 AM on the morning of December 18th, 2018, in what was widely believed to be an act of government-sponsored ethnic cleansing, two armed militia men were seen parachuting from a military plane into the vicinity of Tomato Town. Upon landing the two quickly unholstered assault rifles and entered the local pizzeria where a massacre of unarmed civilians unfolded as they kept shouting, 'Get Down! Get Down!'. Improvised explosives were then detonated at the site of the crime to obscure the victim's identities.",

        "**the sus file: february 14th 2001 'sus incident'**\non that day, the monster from the labs called 'amogus' and the scientific name was 'sussus amosgus' attacked moscow,russia and attacked old york, britain later the military and reinforcment arrived at the old york, then moscow, when the military arrived at the old york (the first location). the military was shocked, because the tall of the monster. the moster tall was 10 km- 11 km. the monster attacked, and the military fought back, but the military easily killed by the monster, later the government launch T-790 nuke, and killed the monsterback to the moscow, the military was killed easily by the monster too, but the russia later killed the monster with 100x mega missilesus\nspaceship crew 2002",

        "**The june 23rd  2021 'lesgo' incident:**\nA few months after the troll incident happened and then we are starting to notice some clues to what seems to be going on right now. In the night of December 14th 2020 a large ufo had seemed to crash in the pacific ocean but no one has noticed it accept us.The contents of what was inside was ancient egyptian art of what seems to be like the characters from the online game 'Among us'. We were startled to see this since among us was a game that released in 2018.Then we found a Car with the giant head of the rapper 'Dababy' as the car itself.Then we heard a loud 'Lesgo' As the car grew itself alien feet and came crawling at us in stunning speed.Luckily at the Trollege foundation we have high tech so we were able to escape it.\nTrollege foundation ™ 2022"
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

module.exports = {
  name: "incident",
    description: "incident",
     
    async run (client, message, args) {
      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
       
      try{
     

      message.channel.send(incident());
        }catch(e){
      return;
    }
    
    }
  
}

module.exports.config = {
    name: "incident",
    timeout: 1000,
    aliases: []
}