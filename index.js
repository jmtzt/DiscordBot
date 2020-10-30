require('dotenv').config()
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-'

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('ChapaoBot is online');
})

client.on('message', message =>{
   if(!message.content.startsWith(prefix) || message.author.bot) return; 

   const args = message.content.slice(prefix.length).split(/ +/);
   const cmd = args.shift().toLowerCase();

   if(cmd === 'proton'){
       client.commands.get('proton').execute(message, args);
   }
   else if(cmd === 'forget'){
       client.commands.get('forget').execute(message, args);
   }
   else if(cmd === 'naogostar'){
       client.commands.get('naogostar').execute(message, args);
   }
   else if(cmd === 'mansaothugstronda'){
       client.commands.get('mansaothugstronda').execute(message, args);
   }
   else if(cmd == 'chapao'){
       const imgEmbed = new Discord.MessageEmbed()
       .setTitle('Nathan Chapao')
       .attachFiles(['./assets/nathanchapao.jpg'])
       .setImage('attachment://nathanchapao.jpg');

       message.channel.send(imgEmbed);
   }
})

client.login(process.env.TOKEN);