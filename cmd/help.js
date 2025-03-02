import { EmbedBuilder } from 'discord.js';

export const data = {
  name: 'help',
  description: 'Menampilkan daftar perintah yang tersedia.',
};

export async function execute(message, args) {
  // Daftar perintah yang tersedia
  const commandList = Array.from(message.client.commands.values())
    .map(command => `\`${command.data.name}\`: ${command.data.description}`)
    .join('\n');

  // Membuat embed
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Daftar Perintah')
    .setDescription(`Berikut adalah daftar perintah yang tersedia:\n\n${commandList}`)
    .setFooter({ text: 'Bot by NeofetchNpc' });

  // Mengirimkan embed ke pesan
  message.reply({ embeds: [embed] });
}
