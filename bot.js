const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const request = require("node-fetch");
const fs = require('fs');


client.commands = new Map();
client.prefix = "!q";

client.on('ready', () => {
  client.user.setActivity("!qplay song name", {
    type: "WATCHING"
  });
  console.log("READY!");
  
  console.log(client.commands);
});


//Cmd Finder
let cmdFile = fs.readdirSync(`./commands`).filter(o => o.endsWith('.js'));

for(let file of cmdFile) {
  
  let name = require(`./commands/${file}`);
  
  client.commands.set(name.name, name)
  
};


//Commander
client.on('message', (message) => {
  
  let args = message.content.slice(client.prefix.length).split(/ +/);
  let command = args.shift().toLowerCase();
  
  if(message.content.startsWith(client.prefix) || message.author.bot) return;
  
  if(!client.commands.has(command)) 
    return;
  
  let cmdCock = require("./commands/" + command);
  
  cmdCock.run(client, message, args);
  
});


client.login(process.env.token);