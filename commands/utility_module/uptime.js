// © 2020 Marlon Gehrmann
const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
    message.delete();
	const duration = moment.duration(bot.uptime).format(" D [Tage], H [Stunden], m [Mins], s [sek]");
    let uptimeEmbed = new Discord.MessageEmbed()
    .setTitle(`• Information for developers •`)
    .setColor('RANDOM')
    .addField('• Uptime', `${duration}`)
    .addField('• Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
    .setTimestamp()
    message.channel.send(uptimeEmbed);
}

module.exports.help = {
    name: "uptime"
}
