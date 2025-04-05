const discord = require('discord.js')
const Canvas = require('canvas')

module.exports.run = async (client, message, args, prefix) => {
   try{
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")


    const target = await message.guild.members.cache.get(args[0]) || message.mentions.members.first();

    if(!target) {
      let target = await message.guild.members.cache.filter(m => m.id !== message.author.id).random().user;



     const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/716216765448978504/858442843197669376/PElrfiWeuvQ.png")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)

    const golden = await Canvas.loadImage('https://i.imgur.com/9hoNXc9.png')
    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png')
    const random = Math.floor(Math.random() * 100);
    const loveIndex = Math.floor(random / 10);
        const loveLevel = "⬜".repeat(loveIndex) + "⬛".repeat(10 - loveIndex);

    if (random >= 90){

      ctx.drawImage(golden, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author.username} + ${target.username} = ${random}%\n${loveLevel}`)
        .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor("GREEN")
        return message.channel.send(embed)

    } else if(random < 90 && random >= 50) {

        ctx.drawImage(heart, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author.username} + ${target.username} = ${random}%\n${loveLevel}`)
        .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor("GREEN")
        return message.channel.send(embed)

    } else {
        ctx.drawImage(broken, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'broken.png')
        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author.username} + ${target.username} = ${random}%\n${loveLevel}`)
        .attachFiles(attachment)
        .setImage(`attachment://broken.png`)
        .setColor("RED")
        return message.channel.send(embed)

    }
    return
    }else if (target) {

    if(target.id == message.author.id) return message.channel.send("Please mention someone else")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/716216765448978504/858442843197669376/PElrfiWeuvQ.png")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.user.displayAvatarURL( { format: "png" } ))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)

    const golden = await Canvas.loadImage('https://i.imgur.com/9hoNXc9.png')
    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png')
    const random = Math.floor(Math.random() * 100);
    const loveIndex = Math.floor(random / 10);
        const loveLevel = "⬜".repeat(loveIndex) + "⬛".repeat(10 - loveIndex);

    if (random >= 90){

      ctx.drawImage(golden, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author.username} + ${target.user.username} = ${random}%\n${loveLevel}`)
        .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor("GREEN")
        return message.channel.send(embed)

    } else if(random < 90 && random >= 50) {

        ctx.drawImage(heart, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author.username} + ${target.user.username} = ${random}%\n${loveLevel}`)
        .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor("GREEN")
        return message.channel.send(embed)

    } else {
        ctx.drawImage(broken, 275, 60, 150, 150)
        const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'broken.png')
        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author.username} + ${target.user.username} = ${random}%\n${loveLevel}`)
        .attachFiles(attachment)
        .setImage(`attachment://broken.png`)
        .setColor("RED")
        return message.channel.send(embed)

    }
    }
   }catch(e){
     console.log(e)
   }

}

module.exports.config = {
    name: 'ship',
    botChannelPermissions: [`ATTACH_FILES`],
    timeout: 4000,
    aliases: []
}