const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {


    const data = await logs.findOne({
        GuildID: message.guild.id
    });

    if (!data) {

        return message.channel.send(`the logs are already disabled`);
    
    }else if (data){

    await logs.deleteOne({
            GuildID: message.guild.id
        })

    return message.channel.send(`👍 logs are now disabled!`);

    } 

}

module.exports.config = {
    name: "disablelogs",
    userPermissions: [`ADMINISTRATOR`],
    timeout: 1500,
    aliases: ["disable-logs", "remove-logs", "removelogs"]
}