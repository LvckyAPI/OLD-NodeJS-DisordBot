const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let messagecount = parseInt(args.join(' '));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Du hast keine Rechte.").then(msg => msg.delete({ timeout: 5000}));
    if (messagecount < 2) return message.reply('Du musst mindestens 2 Nachrichten löschen!').then(m => m.delete({ timeout: 10000 }));
	  if (args.length === 0) return message.reply('** Ungültiges Format: ** `.cc <menge>`').then(msg => msg.delete({ timeout: 5000}));
    if (messagecount > 100) return message.reply('Du kannst nur 100 Nachrichten auf einmal löschen!').then(m => m.delete({ timeout: 10000 }));
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`${args[0]} Nachrichten wurden erfolgreich gelöscht! ✅`).then((msg) => msg.delete({ timeout: 5000}));
    });
}

module.exports.help = {
    name: "cc"
}
