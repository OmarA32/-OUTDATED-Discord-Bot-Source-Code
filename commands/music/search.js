const functions = require("../../functions");
const botsettings = require('../../botsetting.json');


module.exports.run = async (client, message, args) => {
  try{
 

    if(message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join my Voice Channel!")

        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(`You must join my Voice Channel!`)

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send("I am not allowed to \`speak\` in your Channel")

      const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

      const musicargs = args2.join(" ")
      if (!musicargs)return message.channel.send("Add something to search for!")

      message.channel.send(`🎧 **Searching** 🔍 \`${musicargs}\``)

      let result = await client.distube.search(musicargs);

      if(!result)return message.channel.send("found no results!")

      let searchresult = "";

      for (let i = 0; i <= result.length; i++) {
        try {
          searchresult += await `**\`${i + 1}\`**. ${result[i].name} - \`${result[i].formattedDuration}\`\n`;
        } catch {
          searchresult += await " ";
        }
      }
      let searchembed = await functions.embedbuilder(client, message, "#c219d8", "Current Queue!", searchresult)

      let userinput;

      await searchembed.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
        userinput = collected.first().content;
        if (Number(userinput) <= 0 && Number(userinput) > 10) {
          functions.embedbuilder(client, "null", message, config.colors.no, "Not a right number!", "so i use number 1!")
          userinput = 1;
        }
        searchembed.delete({ timeout: Number(client.ws.ping) });
      }).catch(() => { console.log(console.error); userinput = 404 });
      if (userinput === 404) {
        return functions.embedbuilder(client, message, "RED", "Something went wrong!")
      }
      functions.embedbuilder(client, message, "#c219d8", "Searching!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
      return client.distube.play(message, result[userinput - 1].url)

      }else if (!message.guild.me.voice.channel){

        if (!message.member.voice.channel) return message.channel.send("You must join a Voice Channel")

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.channel.send("I am not allowed to \`join\` your Channel")

        message.channel.send(`👍 **joined** \`${message.member.voice.channel.name}\``).then(message.member.voice.channel.join())

        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send("I am not allowed to \`speak\` in your Channel")

        const messageArray = message.content.split(' ');
      const args2 = messageArray.slice(1);

        const musicargs = args2.join(" ")
      if (!musicargs)return message.channel.send("Add something to search for!")

        message.channel.send(`🎧 **Searching** 🔍 \`${musicargs}\``)

      let result = await client.distube.search(musicargs);

      if(!result)return message.channel.send("found no results!")

      let searchresult = "";

      for (let i = 0; i <= result.length; i++) {
        try {
          searchresult += await `**\`${i + 1}\`**. ${result[i].name} - \`${result[i].formattedDuration}\`\n`;
        } catch {
          searchresult += await " ";
        }
      }
      let searchembed = await functions.embedbuilder(client, message, "#c219d8", "Current Queue!", searchresult)

      let userinput;

      await searchembed.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
        userinput = collected.first().content;
        if (Number(userinput) <= 0 && Number(userinput) > 10) {
          functions.embedbuilder(client, "null", message, config.colors.no, "Not a right number!", "so i use number 1!")
          userinput = 1;
        }
        searchembed.delete({ timeout: Number(client.ws.ping) });
      }).catch(() => { console.log(console.error); userinput = 404 });
      if (userinput === 404) {
        return embedbuilder(client, message, "RED", "Something went wrong!")
      }
      functions.embedbuilder(client, message, "#c219d8", "Searching!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
      return client.distube.play(message, result[userinput - 1].url)
      }

    }catch(e){
      console.log(e)
      return;
    }
}

module.exports.config = {
    name: "search",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1500,
    aliases: []
}