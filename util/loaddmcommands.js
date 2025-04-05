const fs = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Dm Commands");
table.setHeading('Command', ' Load status');

function loaddmCommands(client) {
    fs.readdir('dm-commands/', (err, files) => {
       let numberOfCommands = 0;

    
        const jsfile = files;
        if (jsfile.length <= 0) {
            return console.log('Bot Couldn\'t Find Commands in commands Folder.');
        }
    
        jsfile.forEach((f, i) => {
           
            const pull = require(`../dm-commands/${f}`);
            
            if(pull && pull.config && pull.config.name){
            
            client.commands.set(pull.config.name, pull);

            table.addRow(f,'✅')
                numberOfCommands++
            } else {
              table.addRow(f, '❌ - Missing a name')

            }

            if(pull && pull.config && pull.config.aliases && Array.isArray(pull.config.aliases)) {

            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name);
            
            });
            }
            
           
        });
      console.log(`Number of Dm Commands: ${numberOfCommands}`);
      console.log(table.toString());
      console.log(`----------error---------`);
           
    });
}

module.exports = {
    loaddmCommands
}