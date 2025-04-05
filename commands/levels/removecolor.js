const rankColor = require('../../models/rankColor');

module.exports.run = async (client, message, args) => {
    
  try{
  


    const data = await rankColor.findOne({
        MemberID: message.member.id
    });
  

    if(!data){
      
      return message.reply(`removed the custom rank color successfully!`);

   
   } else if (data) {
        
     
      await rankColor.deleteOne({
            GuildID: message.member.id
        })
     
      
        return message.reply(`removed the custom rank color successfully!`);
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