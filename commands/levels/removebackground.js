const rankCard = require('../../models/rankcard');

module.exports.run = async (client, message, args) => {
    
  try{
  


    const data = await rankCard.findOne({
        MemberID: message.member.id
    });
  

    if(!data){
      
      return message.reply(`removed the custom rank background successfully!`);

   
   } else if (data) {
        
     
      await rankCard.deleteOne({
            GuildID: message.member.id
        })
     
      
        return message.reply(`removed the custom rank background successfully!`);
    }
    
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "remove-background",
    timeout: 1500,
    aliases: ["delete-background"]
}