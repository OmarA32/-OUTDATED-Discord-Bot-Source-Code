const Discord = require("discord.js");
const prefix = require('./models/prefix');
const botsettings = require('./botsetting.json');
const db = require('quick.db');


module.exports.embedbuilder = embedbuilder;
module.exports.footer = footer;
module.exports.curembed = curembed;
module.exports.funQueueEmbed = funQueueEmbed;
module.exports.lyricsEmbed = lyricsEmbed;
module.exports.delay = delay;
module.exports.playplaylistyes = playplaylistyes;
module.exports.playsongyes = playsongyes;
module.exports.getRandomInt = getRandomInt;




function footer(prefix) {
  
  var rand = [
    `use (${prefix}help) if you need any!`,
    `join our server, or invite the bot to yours, by using (${prefix}inv)!`,
    'make sure the bot has the needed permissions before using the commands!',
    '...',
    `use (${prefix}fun) and (${prefix}images) if you want some epic commands!`,
    `sniping a friend is a huge mistake!`,
    `it would mean a lot if you can help us by voting, use (${prefix}vote) if you want, thanks for using the bot!`
  ];

  return rand[Math.floor(Math.random() * rand.length)];
    
}



function embedbuilder(client, message, color, title, description, thumbnail) {
  try {
    let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(client.user.username, client.user.displayAvatarURL());
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail)
    return message.channel.send(embed);
  } catch (error) {
    console.error
    return;
  }
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


async function playsongyes(message, queue, song) {
  try {
    let embed1 = new Discord.MessageEmbed()

      .setColor("#c219d8")
      .setTitle("Playing Song!")
      .setDescription(`Song: [\`${song.name}\`](${song.url})`)
      .addField("💡 Requested by:", `>>> ${song.user}`, true)
      .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
      .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
      .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
      .addField("♾ Loop:", `>>> \`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``, true)
      .addField("↪️ Autoplay:", `>>> \`${queue.autoplay ? "✅" : "❌"}\``, true)
      .addField("❔ Filter:", `>>> \`${queue.filter || "❌"}\``, true)
      .setFooter("kitten", "https://i.imgur.com/fAsCAR1.gif")
      .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }), "https://musicium.eu")
      .setThumbnail(song.thumbnail)

    var playingMessage = await message.channel.send(embed1)

    db.set(`playingembed_${message.guild.id}`, playingMessage.id)
    db.set(`playingchannel_${message.guild.id}`, message.channel.id)
    try {
      await playingMessage.react("⏭");
      await playingMessage.react("⏹");
      await playingMessage.react("🔉");
      await playingMessage.react("🔊");
      await playingMessage.react("⬅️");
      await playingMessage.react("➡️");
      await playingMessage.react("⏸");
      await playingMessage.react("◀️");
      await playingMessage.react("♾");
      await playingMessage.react("↪️");
    }
    catch (error) {
      message.reply("Missing permissions, i need to add reactions!")
      console.log(error);
      return;
    }

    const filter = (reaction, user) =>
      ["⏭", "⏹", "🔉", "🔊", "⬅️", "➡️", "⏸", "◀️", "♾", "↪️"].includes(reaction.emoji.name) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });
    collector.on("collect", async (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);
      if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection) return;

      switch (reaction.emoji.name) {
        case "⏭":
          client.distube.skip(message);
          embedbuilder(client, message, "#c219d8", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error));
          playingMessage.reactions.removeAll().catch(console.error);
          playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
          break;

        case "⏹":
          client.distube.stop(message);
          playingMessage.reactions.removeAll().catch(console.error);
          playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
          embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
          break;

        case "🔉":

          reaction.users.remove(user).catch(console.error);
          await client.distube.setVolume(message, Number(queue.volume) - 10);
          embedbuilder(client, message, "#c219d8", "Volume!", `Redused the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        case "🔊":

          reaction.users.remove(user).catch(console.error);
          await client.distube.setVolume(message, Number(queue.volume) + 10);
          embedbuilder(client, message, "#c219d8", "Volume!", `Raised the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        case "⬅️":

          reaction.users.remove(user).catch(console.error);
          let seektime = queue.currentTime - 10000;
          if (seektime < 0) seektime = 0;
          await client.distube.seek(message, Number(seektime));
          playingMessage.edit(curembed(message)).catch(console.error);
          embedbuilder(client, message, "#c219d8", "Seeked!", `Seeked the song for \`-10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

          break;

        case "➡️":
          reaction.users.remove(user).catch(console.error);
          let seektime2 = queue.currentTime + 10000;
          if (seektime2 >= queue.songs[0].duration * 1000) { seektime2 = queue.songs[0].duration * 1000 - 1; }
          console.log(seektime2)
          await client.distube.seek(message, seektime2);
          playingMessage.edit(curembed(message)).catch(console.error);
          embedbuilder(client, message, "#c219d8", "Seeked!", `Seeked the song for \`+10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
          break;

        case "⏸":
          reaction.users.remove(user).catch(console.error);
          embedbuilder(client, message, "#c219d8", "paused!", `paused the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

          client.distube.pause(message);
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        case "◀️":
          reaction.users.remove(user).catch(console.error);
          embedbuilder(client, message, "#c219d8", "resumed!", `resumed the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

          client.distube.resume(message);
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        case "♾":
          reaction.users.remove(user).catch(console.error);
          client.distube.setRepeatMode(message, Number(1));
          await playingMessage.edit(curembed(message)).catch(console.error);

          break;

        case "↪️":
          reaction.users.remove(user).catch(console.error);
          client.distube.toggleAutoplay(message);
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });
    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
    })
  } catch (error) {
    console.log(error)
    return;
  }
}









function curembed(message) {
  try {
    let queue = client.distube.getQueue(message); //get the current queue
    let song = queue.songs[0];
    embed = new Discord.MessageEmbed()
      .setColor("#c219d8")
      .setTitle("Playing Song!")
      .setDescription(`Song: [\`${song.name}\`](${song.url})`)
      .addField("💡 Requested by:", `>>> ${song.user}`, true)
      .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
      .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
      .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
      .addField("♾ Loop:", `>>> \`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``, true)
      .addField("↪️ Autoplay:", `>>> \`${queue.autoplay ? "✅" : "❌"}\``, true)
      .addField("❔ Filter:", `>>> \`${queue.filter || "❌"}\``, true)
      .setFooter("kitten", "https://i.imgur.com/fAsCAR1.gif")
      .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }), "https://musicium.eu")
      .setThumbnail(song.thumbnail)
    return embed; //sending the new embed back
  } catch (error) {
    console.error
    return;
  }
}

async function playplaylistyes(client, message, queue, playlist, song) {
    try {
        var playingMessage = await embedbuilder(client, message, "#c219d8", "Playling playlist", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}\n\nVolume: \`${queue.volume} %\`\nLoop: \`${queue.repeatMode ? "On" : "Off"}\`\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\`\nFilter: \`${queue.filter || "❌"}\``, playlist.thumbnail)
        await playingMessage.react("⏭");
        await playingMessage.react("⏹");
        await playingMessage.react("🔉");
        await playingMessage.react("🔊");
        await playingMessage.react("⬅️");
        await playingMessage.react("➡️");
        await playingMessage.react("⏸");
        await playingMessage.react("◀️");
        await playingMessage.react("♾");
        await playingMessage.react("↪️");
    }
    catch {
        console.error(error);
    }
    try{ 
    const filter = (reaction, user) =>
        ["⏭", "⏹", "🔉", "🔊", "⬅️", "➡️", "⏸", "◀️", "♾", "↪️"].includes(reaction.emoji.name) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000
    });
    collector.on("collect", (reaction, user) => {
        if (!queue) return;
        const member = message.guild.member(user);
        if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection) return;

        switch (reaction.emoji.name) {

            case "⏭":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#c219d8", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                client.distube.skip(message);
                break;

            case "⏹":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                client.distube.stop(message);
                break;

            case "🔉":
                reaction.users.remove(user).catch(console.error);
                client.distube.setVolume(message, Number(queue.volume) - 10);
                embedbuilder(client, message, "#c219d8", "Volume!", `Redused the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "🔊":
                reaction.users.remove(user).catch(console.error);
                client.distube.setVolume(message, Number(queue.volume) + 10);
                embedbuilder(client, message, "#c219d8", "Volume!", `Raised the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "⬅️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#c219d8", "Seeked!", `Seeked the song for \`-10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                let seektime = queue.currentTime - 10000;
                if (seektime < 0) seektime = 0;
                client.distube.seek(message, Number(seektime));
                break;

            case "➡️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#c219d8", "Seeked!", `Seeked the song for \`+10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                let seektime2 = queue.currentTime + 10000;
                console.log(seektime2);
                if (seektime2 > queue.songs[0].duration) seektime2 = queue.songs[0].duration - 1;
                client.distube.seek(message, Number(seektime2));
                break;
              
                case "⏸":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#c219d8", "paused!", `paused the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

                client.distube.pause(message);
                
                break;

          case "◀️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "#c219d8", "resumed!", `resumed the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

               client.distube.resume(message);
               
          break;

        case "♾":
               reaction.users.remove(user).catch(console.error);
               client.distube.setRepeatMode(message, Number(1));
               

          break;

        case "↪️":
                reaction.users.remove(user).catch(console.error);
                client.distube.toggleAutoplay(message);
                
                break;

            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
    collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
    })
}catch (error){
    console.error
 }
}




function funQueueEmbed(queue) {
  try {
    let embeds = [];
    let k = 10;
    //defining each Pages
    for (let i = 0; i < queue.length; i += 10) {
      const current = queue.slice(i, k)
      let j = i;
      k += 10;
      const info = current.map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`).join("\n")
      const embed = new Discord.MessageEmbed()
        .setTitle("Server Queue")
        .setColor("#c219d8")
        .setDescription(`**Current Song - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`)
        .setFooter("kitten", "https://i.imgur.com/fAsCAR1.gif")
      embeds.push(embed);
    }
    //returning the Embed
    return embeds;
  } catch (error) {
    console.error
    return;
  }

}

function lyricsEmbed(message, lyrics, song) {
  try {
    let embeds = [];
    let k = 1000;

    for (let i = 0; i < lyrics.length; i += 1000) {
      const current = lyrics.slice(i, k);
      let j = i;
      k += 1000;
      const embed = new Discord.MessageEmbed()
        .setTitle("Lyrics - " + song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setColor("#c219d8")
        .setDescription(current)
      embeds.push(embed);
    }
    return embeds;
  } catch (error) {
    console.error
    return;
  }
}

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
