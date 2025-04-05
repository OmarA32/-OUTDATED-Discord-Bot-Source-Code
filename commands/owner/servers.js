const Discord = require("discord.js");
const db = require('quick.db')
const botsettings = require('../../botsetting.json');


exports.run = async (client, message, args) => {

  
    try{

        var servers = client.guilds
        var num = 0;
        var page = 1;
        var totalPages = parseInt(servers.cache.size/10+1);
        let guilds = client.guilds.cache.size.toLocaleString();
        var embed = new Discord.MessageEmbed()

        .setDescription(`${servers.cache.map(se => `**name:** \`${se.name}\`\n**ID:** \`${se.id}\`\n**Users:** \`${se.members.cache.size}\``).slice(0,10).join('\n')}`)
        .setTitle(`server the Kitten is in: ${guilds} servers.`)
        .setFooter(`page (${page}/${totalPages}) | Total (${client.guilds.cache.size})`, message.author.displayAvatarURL({ dynamic: true }))
        .setAuthor('servers:', client.user.displayAvatarURL())
        .setColor("#985ce7")
        .setThumbnail(client.user.displayAvatarURL())
        message.author.send(embed).then(async ser => {

            if(servers.cache.size > 10) {

                await ser.react("◀️");
                await ser.react("▶️");
                
                const back = ser.createReactionCollector((r, u) => r.emoji.name === "◀️" && u.id === message.author.id, { time: 100000 });

                const next = ser.createReactionCollector((r, u) => r.emoji.name === "▶️" && u.id === message.author.id, { time: 100000 });
               
            
                            back.on("collect", async r => {
                                if(page !== 1) {
                                    num = num-10
                                    num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                    page -= 1
                                    var embed = new Discord.MessageEmbed()

                                .addField(`Servers:`, `${servers.cache.map(se=> `**Nome:** \`${se.name}\`\n**ID:** \`${se.id}\`\n**Users:** \`${se.members.cache.size}\``).slice(page*10-10,page*10).join('\n')}`)
                                .setFooter(`page (${page}/${totalPages}) | Total (${client.guilds.cache.size})`, message.author.displayAvatarURL({ dynamic: true }))
                                .setColor("#985ce7")
                                .setAuthor('Servers:', client.user.displayAvatarURL({ dynamic: true }))
                                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                ser.edit(embed)
                                r.users.remove(message.author)
                                } else {
                                    page = totalPages
                                    num = totalPages*10-20

                                    var embedb = new Discord.MessageEmbed()

                                    .setDescription(`${servers.cache.map(se=> `**Name:** \`${se.name}\`\n**ID:** \`${se.id}\`\n**Users:** \`${se.members.cache.size}\``).slice(totalPages*10-10,page*10).join('\n')}`)
                                    .setFooter(`page (${page}/${totalPages}) | Total (${client.guilds.cache.size})`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                    .setAuthor('Servers:', client.user.displayAvatarURL({ dynamic: true }))
                                    .setColor("#985ce7")
                                ser.edit(embedb)

                                r.users.remove(message.author)
                                }
                            })
            
                            next.on("collect", async r => {
                                if(page !== totalPages) {
                                    num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                    num = num+10
                                    page += 1

                                    var embedc = new Discord.MessageEmbed()

                                    .setDescription(`${servers.cache.map(se=> `**Nome:** \`${se.name}\`\n**ID:** \`${se.id}\`\n**Users:** \`${se.members.cache.size}\``).slice(page*10-10,page*10).join('\n')}`)
                                    .setFooter(`page (${page}/${totalPages}) | Total (${client.guilds.cache.size})`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                    .setAuthor('Servers:', client.user.displayAvatarURL({ dynamic: true }))
                                    .setColor("#985ce7")
                                ser.edit(embedc)
        
                                r.users.remove(message.author)
                                } else {
                                    page = 1
                                    num = 0

                                    var embedd = new Discord.MessageEmbed()

                                    .setDescription(`${servers.cache.map(se=> `**Name:** \`${se.name}\`\n**ID:** \`${se.id}\`\n**Users:** \`${se.members.cache.size}\``).slice(0,page*10).join('\n')}`)
                                    .setFooter(`page (${page}/${totalPages}) | Total (${client.guilds.cache.size})`, message.author.displayAvatarURL())
                                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                    .setAuthor('Servers:', client.user.displayAvatarURL({ dynamic: true }))
                                    .setColor("#985ce7")
                                    ser.edit(embedd)

                                    r.users.remove(message.author)
                    }
                })
            }
        })
    }catch(e){
      console.log(e)
      return;
    }
}



module.exports.config = {
    name: "servers",
    owner: "true",
    timeout: 1000,
    aliases: ["server"]
}

