import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config(); // Memuat variabel lingkungan dari .env

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Map();

// Memuat perintah dari folder cmd
const commandsPath = path.join(new URL('./cmd', import.meta.url).pathname);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const { data, execute } = await import(path.join(commandsPath, file));
  client.commands.set(data.name, { data, execute });
}

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Menambahkan pengecekan untuk dua prefix: '!' dan 'l!'
  const prefixes = ['!', 'l!'];
  const prefix = prefixes.find(p => message.content.startsWith(p));

  if (!prefix) return; // Jika tidak ada prefix yang cocok, lewati pesan ini

  // Memotong prefix dan mengambil nama perintah serta argumen
  const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/);

  const command = client.commands.get(commandName.toLowerCase());
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.login(process.env.DISCORD_TOKEN);
