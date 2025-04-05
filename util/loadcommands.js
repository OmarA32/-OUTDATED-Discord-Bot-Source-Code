const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');

function loadCommands(client) {
  let numberOfCommands = 0;

    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull && pull.config && pull.config.name){
                client.commands.set(pull.config.name, pull);
                table.addRow(file,'✅')
                numberOfCommands++
            } else {
                table.addRow(file, '❌ - Missing name')
                continue;
            }
            if(pull && pull.config && pull.config.aliases && Array.isArray(pull.config.aliases)) {
              pull.config.aliases.forEach(alias => client.aliases.set(alias, pull.config.name))
            } 
        }
    });
    console.log(`--------------------`)
    console.log(`Number of Commands: ${numberOfCommands}`);
    console.log(table.toString());
}


module.exports = {
    loadCommands
}



