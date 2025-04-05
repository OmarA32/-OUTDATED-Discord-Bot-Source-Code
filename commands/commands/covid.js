const fetch = require('node-fetch');
const botsettings = require('../../botsetting.json')
const prefix = require('../../models/prefix');
const Discord = require('discord.js');


module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",

    async run (client, message, args){

      if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))return

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    if(data) {
      let prefix = data.Prefix;

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)
        if(!args[0]){
   
        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor("#985ce7")
        .setDescription(`You are missing some args\n\`${prefix}covid <all / specific country>\``)
        .setTimestamp()

         return message.channel.send(noArgs);
        
        
        }
        

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()
                

                const allcovid = new Discord.MessageEmbed()
                .setColor("#985ce7")
                .setAuthor(message.author.tag)
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                
                

                message.channel.send(allcovid)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()
               

                const countriescovid = new Discord.MessageEmbed()
                .setColor("#985ce7")
                .setAuthor(message.author.tag)
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                
                
                
                message.channel.send(countriescovid)
            }).catch(e => {
                return message.channel.send('Invalid country provided')
            })
        }
    }else if (!data){
      let prefix = botsettings.prefix;

      let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)
        if(!args[0]){
      
    
    
        
        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor("#985ce7")
        .setDescription(`You are missing some args\n\`${prefix}covid <all / specific country>\``)
        .setTimestamp()

         return message.channel.send(noArgs);
        
        
        }
        

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()
                

                const allcovid = new Discord.MessageEmbed()
                .setColor("#985ce7")
                .setAuthor(message.author.tag)
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                
                

                message.channel.send(allcovid)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()
               

                const countriescovid = new Discord.MessageEmbed()
                .setColor("#985ce7")
                .setAuthor(message.author.tag)
                .setThumbnail(message.author.avatarURL({ dynamic: true }))
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                
                
                
                message.channel.send(countriescovid)
            }).catch(e => {
                return message.channel.send('Invalid country provided')
            })
        }

    }
    }
}

module.exports.config = {
    name: "covid",
    botChannelPermissions: [`EMBED_LINKS`],
    timeout: 1000,
    aliases: ["corona"]
}