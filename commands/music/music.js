const Discord = require('discord.js');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args, prefix) => {

  functions.embedbuilder(client, message, "#c219d8", "Commands:", `
        Prefix is: \`${prefix}\`\n\nMAIN COMMANDS:\n\n
        \`${prefix}play <URL/NAME>\`/\`${prefix}p <URL/NAME>\`   --  Plays a song.
        \`${prefix}radio [radiostation]\`   --  Plays a radiostation.
        \`${prefix}search <URL/NAME>\`   --  Searches for top 15 results.
        \`${prefix}status\`   --  Shows queue status.
        \`${prefix}nowplaying\`/\`${prefix}np\`   --  Shows current song.
        \`${prefix}pause\`   --  Pauses the playing song.
        \`${prefix}resume\`/\`${prefix}r\`   --  Resume the paused song.
        \`${prefix}shuffle\`/\`${prefix}mix\`   --  Shuffles the queue.
        \`${prefix}playskip\`/\`${prefix}ps\`   --  Plays new song and skips current.
        \`${prefix}autoplay\`/\`${prefix}ap\`   --  Enables autoplay, random similar songs.
        \`${prefix}skip\`/\`s\`   --  Skips current song.
        \`${prefix}stop\`/\`${prefix}leave\`   --  Stops playing and leaves the channel. 
        \`${prefix}seek <DURATION>\`   --  Moves in the Song in: seconds.
        \`${prefix}volume <VOLUME\`/\`${prefix}vol\`   --  Changes volume.
        \`${prefix}queue\`/\`${prefix}qu\`   --  Shows current Queue.
        \`${prefix}loop <0/1/2>\`/\`${prefix}repeat\`   --  Enables loop for off / song / queue.
        \`${prefix}jump <Queue num.>\`   --  Jumps to a queue song\n\nEFFECTS: - \`${prefix}filter <effect>\`\n
        \`clear\`   --  Changes filter to clear.
        \`3d\`   --  Changes filter to 3d.
        \`bassboost\`   --  Changes filter to bassboost.
        \`echo\`   --  Changes filter to echo.
        \`karaoke\`   --  Changes filter to karaoke.
        \`nightcore\`   --  Changes filter to nightcore.
        \`vaporwave\`   --  Changes filter to vaporwave.
        \`flanger\`   --  Changes filter to flanger.
        \`subboost\`   --  Changes filter to subboost.`)
      return;
}



module.exports.config = {
    name: "music",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["music help"]
}
