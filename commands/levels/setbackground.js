const rankCard = require('../../models/rankcard');

module.exports.run = async (client, message, args) => {
    
  try{
  
   if (message.attachments.size == 0)return message.reply(`add an image when using the command!`);

    const messageAttachment = await message.attachments.first().proxyURL;
    const nameArray = messageAttachment.split('.');
    const attEx = nameArray[nameArray.length - 1];
    
    if (attEx == "png" || attEx =="jpeg" || attEx =="jpg"){

    const data = await rankCard.findOne({
        MemberID: message.member.id,
    });
  

    if(!data){

      let newData = new rankCard({
            MemberID: message.member.id,
            Link: messageAttachment,
        })
        newData.save();
      
      return message.reply(`changed the custom rank background successfully!`);

   
   } else if (data) {
        
     
      await rankCard.deleteOne({
            MemberID: message.member.id,
        })
     
        let newData = new rankCard({
            MemberID: message.member.id,
            Link: messageAttachment,
        })
        newData.save();
      
        return message.reply(`changed the custom rank background successfully!`);
    }
    } else {

      return message.reply(`You can only use this command for: (\`png, jpg, jpeg\`) files.`);

    }
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "set-background",
    timeout: 1500,
    aliases: ["add-background", "setbackground"]
}