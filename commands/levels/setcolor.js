const rankColor = require('../../models/rankColor');

module.exports.run = async (client, message, args) => {
    
  try{

    const color = args[0];

    if(!color)return message.reply(`add a color hex when using the command! (add the number of the hex color without the (#)`)

    if(color.includes(`#`))return message.reply(`remove the (#)`)
  

    const data = await rankColor.findOne({
        MemberID: message.member.id,
    });
  

    if(!data){

      let newData = new rankColor({
            MemberID: message.member.id,
            Color: color,
        })
        newData.save();
      
      return message.reply(`changed the custom rank color successfully!`);

   
   } else if (data) {
        
     
      await rankColor.deleteOne({
            MemberID: message.member.id,
        })
     
        let newData = new rankColor({
            MemberID: message.member.id,
            Color: color,
        })
        newData.save();
      
        return message.reply(`changed the custom rank color successfully!`);
    }
   
  }catch(e){
    console.log(e)
  }
}

module.exports.config = {
    name: "setcolor",
    timeout: 1500,
    aliases: ["set-color"]
}