const Discord = require('discord.js');
const moment = require('moment');
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
   if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return
 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.guild.members.cache.find(x => x.user.tag.toLowerCase() === args.slice(0).join(" ") || x.user.tag === args[0]) || message.member;

    if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
    if (member.presence.status === 'online') member.presence.status = 'Online';
    if (member.presence.status === 'idle') member.presence.status = 'Idle';
    if (member.presence.status === 'offline') member.presence.status = 'offline';

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
    let status = member.presence.status;

    const userEmbed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic : true}))
    .setColor("#985ce7")
    .setThumbnail(member.user.displayAvatarURL({dynamic : true}))
    .addField("Member ID", member.id)
    .addField('Roles', `<@&${member._roles.join('> <@&')}>`)
    .addField("Account Created On:", ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField('Joined the server At', `${joineddate} \n> ${joined} day(S) Ago`)
    .addField("Status", status)
    .setFooter(`on (${message.guild.name})`, message.guild.iconURL({dynamic: true}))
    .setTimestamp()
    if (member.user.presence.game) 
            userEmbed.addField('Currently playing', stripIndents`> Name: ${member.user.presence.game.name}`);

    message.channel.send(userEmbed);
    if(!message.channel)return;
  
}

module.exports.config = {
    name: "info",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['userinfo', 'user', 'member', 'profile', 'whois']
}