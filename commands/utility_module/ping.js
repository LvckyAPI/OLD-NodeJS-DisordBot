// © 2020 Marlon Gehrmann
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let pingembed = new Discord.MessageEmbed()
    .setDescription(`Ping: ${new Date().getTime() - message.createdTimestamp}ms`)
    .setColor("#c88e38")
    return message.channel.send(pingembed).then(msg => msg.delete({ timeout: 5000}));
}

module.exports.help = {
    name: "ping"
}
