let Discord = require('discord.js');
let ytdl = require('ytdl-core');
let fetch = require("node-fetch");

module.exports = {
  name: 'play',
  run: async (client, message, args) => {
    
    let text = args.join(" ");
    if(!text) return message.channel.send(":x: | No Query Given!"); 
    
    
    let vc = message.member.voiceChannel;
    
    let join = await vc.join();
    
    if(!vc) return message.channel.send(":x: | Join a voice channel!");
    
    fetch(`https://srrrrkant.glitch.me/api/youtube/${encodeURIComponent(text)}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then( async (data) => {
      
      
      console.log(data)
      
      if(!ytdl.validateURL(data.url)) return message.channel.send(":x: | no Vids Found!");
      
      let video = await ytdl.getVideo(data.url)
      
      join.playStream(ytdl(video.url, {
        quality: "highestaudio",
        filter: "audioonly",
        bitrate: "256000"
      }));
      
      
      
      
    })
    
  }
}