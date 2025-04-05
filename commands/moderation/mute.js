const botsettings = require('../../botsetting.json');
const Discord = require('discord.js');
const logs = require('../../models/logs');

module.exports.run = async (client, message, args) => {
  

   if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

   

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);


        if(!Member) return message.channel.send('Member is not found.')

        if(message.member === Member)return message.channel.send('You cant mute yourself idiot.')

        if(message.guild.me === Member)return message.channel.send(':/')

        if(Member.hasPermission("ADMINISTRATOR")) return message.channel.send('that user has admin!')


        const messageArray = message.content.split(' ');
        const args2 = messageArray.slice(1);

         const reason = args2.slice(1).join(" ") || `there was no reason!`

        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'mute')

        if(!role) {
            try {
                message.channel.send('**\`mute\`** role is not found, attempting to create a **\`mute\`** role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'mute',
                         color: '#f80909',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        MANAGE_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('**\`mute\`** role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };

        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'mute')

        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)

        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} is now muted.`)

    const data = await logs.findOne({
        GuildID: message.guild.id
    });

  if(data){

  let log = await message.guild.channels.cache.get(data.ChannelID)
        if(log){
          const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
          .setDescription(`${message.author} muted ${Member}\n**reason:** ${reason}`)
          .setTimestamp();
          log.send(embed)
        }
    }
      
 
}


module.exports.config = {
    name: "mute",
    userPermissions: [`BAN_MEMBERS`],
    botPermissions: [`MANAGE_ROLES`],
    timeout: 1000,
    aliases: []
}