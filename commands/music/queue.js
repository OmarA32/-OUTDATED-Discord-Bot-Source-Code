const db = require('quick.db');
const functions = require("../../functions");
const botsettings = require('../../botsetting.json');

module.exports.run = async (client, message, args) => {
  try{
    if (!message.member.voice.channel) return message.channel.send(" You must join a Voice Channel")
       
      if (!message.guild.me.voice.channel) return message.channel.send("Nothing is playing!")

      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)
     
      let currentPage = 0;
      let queue = client.distube.getQueue(message);
      if (!queue) return functions.embedbuilder(client, message, "RED", "There is nothing playing!").then(msg => msg.delete({ timeout: 5000 }).catch(console.error));

      const embeds = functions.funQueueEmbed(queue.songs);
      
      const queueEmbed = await message.channel.send(`
        **Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds[currentPage]);
      try {
        await queueEmbed.react("⬅️");
        await queueEmbed.react("⏹");
        await queueEmbed.react("➡️");
      } catch (error) {
        console.error(error)

      }
      const filter = (reaction, user) =>
        ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
            }
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;
              queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
            }
          } else {
            collector.stop();
            reaction.message.reactions.removeAll();
          }
          await reaction.users.remove(message.author.id);
        } catch (error) {
          console.error(error)

        }
      })
    }catch(e){
      console.log(e)
      return;
    }
}

module.exports.config = {
    name: "queue",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: ['qu']
}