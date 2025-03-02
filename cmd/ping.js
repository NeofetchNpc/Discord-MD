export const data = {
    name: 'ping',
    description: 'Testing Pong!',
  };
  
  export async function execute(message, args) {
    message.reply('Pong!');
  }
  