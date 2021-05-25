// © 2020 Marlon Gehrmann
const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    message.delete();
    let discordembed = new Discord.MessageEmbed()
        .setAuthor("Discord [click]", "https://cdn.discordapp.com/avatars/790993365651030076/67fa2140204841cd4e4ec165a4c746fa.png?size=128", "https://discord.gg/Nw48AXY")
        .setColor("#3857c8")
    return message.channel.send(discordembed);
}

module.exports.help = {
    name: "discord"
}