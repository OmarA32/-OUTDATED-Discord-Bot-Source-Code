const fetch = require("node-fetch").default;
const Discord = require('discord.js');
const mySecret = process.env.DISCORD_TOKEN;
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  const { channel } = message.member.voice;
    if(!channel) return message.reply("You need to join a Voice Channel")
    
  fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${mySecret}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite =>{
            if(!invite.code) return message.reply(":x: Cannot start minigame")
            message.channel.send(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`)
        })
}


module.exports.config = {
    name: "youtubetogether",
    timeout: 1000,
    aliases: ['ytt']
}