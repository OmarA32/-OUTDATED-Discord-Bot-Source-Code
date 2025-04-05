const fs = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Events");
table.setHeading('Event', ' Load status');

module.exports = client => {
    
    fs.readdir("events/", (_err, files) => {
       let numberOfCommands = 0;
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`../events/${file}`)];
            table.addRow(file,'✅')
                numberOfCommands++
        });
        console.log(`Number of events: ${numberOfCommands}`);
        console.log(table.toString());
      console.log(`-----------dm-----------`);
    });
     
}