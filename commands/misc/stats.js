const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const botsettings = require('../../botsetting.json');
let os = require('os');
let cpuStat = require("cpu-stat");

module.exports.run = async (client, message, args) => {

  const members = await client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)
 
  try {
    let cpuLol;
    cpuStat.usagePercent(function (err, percent) {
      if (err) {
        return console.log(err);
      }

      const duration = moment.duration(client.uptime).format(" D [Days], H [Hours], m [Minutes], s [Seconds]");

      var djs_icon = "<:discordjs:876678767593029633>";
      var njs_icon = "<:nodejs:876678768478007296>";

      const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.tag}\'s Statistics`, client.user.avatarURL())
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(`${djs_icon}  **Discord.js (v${version})**\n${njs_icon}  **Node.js (${process.version})**`)
        .addField("<a:gear:876678769027465256> Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} / 10240 MB\` used`, true)
        .addField("<:servers:876678768826134549> CPU Usage", `\`${percent.toFixed(0)} %\``, true)
        .addField("<:info:876678769610461254> Platform", `\`${os.type}\``, true)
        .addField("<a:online:876678777395105792> Uptime", `\`${duration}\``, true)
        .addField("<a:loading:876678772827512882> Ping", `API : \`${Math.floor(client.ws.ping)}ms\`\nLatency : \`${Date.now()- message.createdTimestamp} ms\``, true)
        .addField("<a:globe:876678771367895041> Client", `Server: \`${client.guilds.cache.size.toLocaleString()} Joined\`\nChannels: \`${client.channels.cache.size.toLocaleString()}\`\nUsers: \`${members.toLocaleString()} Users\``, true)
        .setColor("#985ce7")
      message.channel.send(embed);

    });
  } catch (error) {
    return message.channel.send(`bruh something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}


module.exports.config = {
    name: "stats",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ['stats', 'cpu'],
}