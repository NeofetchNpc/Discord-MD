import { EmbedBuilder } from 'discord.js';
import nessid from 'neastooapi';

export const data = {
    name: 'waifu',
    description: 'Mengambil gambar waifu SFW!',
};

export async function execute(message, args) {
    try {
        const response = await nessid.SFWaifu();
        const waifuData = response.images[0];

        if (!waifuData) {
            return message.reply('Gagal mengambil gambar waifu.');
        }

        const embed = new EmbedBuilder()
            .setTitle('Waifu SFW')
            .setDescription(
                `**Artist:** ${waifuData.artist && waifuData.artist.name ? `[${waifuData.artist.name}](${waifuData.artist.pixiv || '#'})` : 'Tidak ada'}\n` +
                `**Source:** ${waifuData.source ? `[Pixiv](${waifuData.source})` : 'Tidak ada'}`
            )
            .setImage(waifuData.url)
            .setColor(waifuData.dominant_color || '#FFFFFF')
            .setFooter({ text: `Tag: ${waifuData.tags && waifuData.tags.length > 0 ? waifuData.tags.map(tag => tag.name).join(', ') : 'Tidak ada'}` });

        message.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error mengambil gambar waifu:', error);
        message.reply('Maaf, terjadi kesalahan saat mengambil gambar waifu.');
    }
}
