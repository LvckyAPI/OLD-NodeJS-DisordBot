const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ping = require('ping');
const timers = require('timers')
    //const memberPresenceListener = require('./listeners/memberPresence.js');
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();


let DoniCarChannelEmojiID = "823949947710865518";
let DoniCarChannelID = "823937338996424724";


let everyoneid = "803387433433301022";
let carcreatorroleid = "803391241789112381";
let TicketEmojizumLöschenID = "823949934507327568";

let teamrole = "803387890544410624";
let TicketEmoji = "823949947710865518";
let TicketChannelID = "808053777118265414";

let plRole = "803387889437638667";

// Lade Commands JS´s
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('\x1b[31m%s\x1b[0m', "Could not folder commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        if (botconfig["bot_setup"].debug_mode) {
            console.log(`${f} loaded!`);
        }
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
    });
});

// Lade utility commands JS´s
if (botconfig["module_toggles"].utility_commands) {
    fs.readdir("./commands/utility_module/", (err, files) => {
        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if (jsfile.length <= 0) {
            console.log('\x1b[31m%s\x1b[0m', "Could not folder utility_module.");
            return;
        }

        jsfile.forEach((f, i) => {
            let props = require(`./commands/utility_module/${f}`);
            if (botconfig["bot_setup"].debug_mode) {
                console.log(`${f} loaded!`);
            }
            bot.commands.set(props.help.name, props);
        });
    });

}

let activities = [{ name: "AdvancedLifeRP", options: { type: "PLAYING" } }, {
    name: "TS3: ts.AdvancedLifeRP.eu",
    options: { type: "PLAYING" }
}];
let i = 0;
bot.on('error', console.error);
bot.on("ready", async() => {
    console.log('\x1b[32m%s\x1b[0m', `DiscordBot Bot is online and set up! I'm on ${bot.guilds.size} servers.`);
    timers.setInterval(() => {
        i = i == activities.length ? 0 : i
        bot.user.setActivity(activities[i].name, activities[i].options);
        bot.user.setStatus('dnd')
        i++
    }, 15000)


    let channel = bot.channels.fetch(DoniCarChannelID).then(channel1 => {
        channel1.bulkDelete(10)

        let gembed = new Discord.MessageEmbed()
            .setTitle('🔥 AdvancedLifeRP Tickets 🔥')
            .setDescription(`Du hast schon gespendet oder hast es vor?
    
        Erstelle ein Ticket um deine letzten Fragen und um deine Belohnung abzuholen, weitere Informationen findest du im <#807626232245387276> Channel.
    
        Klicke einfach auf das Symbol und ein Ticket wird eröffnet.`)
            .setColor("#0394fc")
            .setFooter('Liebe Grüße dein Support Team.')

        channel1.send(gembed).then(async(donimessage) => {
            donimessage.pin()
            donimessage.react(DoniCarChannelEmojiID)
        })
    })

    let ticketchannel = bot.channels.fetch(TicketChannelID).then(ticketchannel1 => {
        ticketchannel1.bulkDelete(10)

        let gembedd = new Discord.MessageEmbed()
            .setTitle('🔥 AdvancedLifeRP Tickets 🔥')
            .setDescription(`Hast du Fragen oder ein Problem?\n\nUnser Team kann dir weiterhelfen.\nErstelle doch einfach ein Ticket!`)
            .setColor("#0394fc")
            .setFooter('Liebe Grüße dein Support Team.')

        ticketchannel1.send(gembedd).then(async(ticketmessage) => {
            ticketmessage.pin()
            ticketmessage.react(TicketEmoji)
        })
    })

    console.log(`Performance & Statistics Check Made. Status: Complete`)
        //memberPresenceListener.init(bot);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig["bot_setup"].prefix;
    // Announcement Channel FiveM Info
    if (message.channel.id === "820047908765302789") {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "820047908765302789");
        await channel.send({
            embed: {
                author: {
                    name: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                    url: 'https://AdvancedLifeRP.de',
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }
});

bot.on("message", async message => {

    if (message.content == ".lw-123456789") {
        message.delete();
        message.channel.send("Samma Ihr penner!")
        message.channel.send("LvckyWorld lässt grüßen, und ach ja...")
        message.channel.send(`<@466986428107063306> ist cool`)
    }

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig["bot_setup"].prefix;
    // Team News Channel announcement
    if (message.channel.id === "804834413988937738") {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "804834413988937738");
        await channel.send({
            embed: {
                title: '💎| Team News AdvancedLifeRP |💎',
                footer: {
                    text: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }

    if (message.channel.id === "803400019541622805") {
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "803400019541622805");
        await channel.send({
            embed: {
                footer: {
                    text: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }

    if (message.channel.id === "811269934943305728") {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "811269934943305728");
        await channel.send({
            embed: {
                title: '📢| Ankündigung News AdvancedLifeRP |📢',
                footer: {
                    text: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }

    if (message.channel.id === "804828371548504095") {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "804828371548504095");
        await channel.send({
            embed: {
                title: '📢| Fraktionsinfo AdvancedLifeRP |📢',
                footer: {
                    text: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }

    if (message.channel.id === "807351922038276096") {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "807351922038276096");
        await channel.send({
            embed: {
                title: '📃| Changelog AdvancedLifeRP |📃',
                footer: {
                    text: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }

    if (message.channel.id === "804828325931384853") {
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;
        message.delete();
        let messageds = message.content;
        const channel = message.member.guild.channels.cache.find(channel => channel.id === "804828325931384853");
        await channel.send({
            embed: {
                title: '🎉| Eventinfo AdvancedLifeRP |🎉',
                footer: {
                    text: `${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                color: "RANDOM",
                description: messageds,
                timestamp: new Date()
            }
        });
    }

    // Commands Loader
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

    if (message.content === ".accept") {
        if (message.channel.name.includes("📄-")) {

            if (message.member.roles.cache.get(carcreatorroleid)) {
                message.channel.setName(`📄-a-${message.author.username}`)

                let acceptembed = new Discord.MessageEmbed()
                    .setTitle(`🔥 Auftragsstatus 🔥`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`Der <@&${carcreatorroleid}>, <@${message.author.id}> hat dein Ticket angenommen.`)
                    .setColor('RANDOM')
                message.channel.send(acceptembed).then(messageembed => {
                    messageembed.pin()
                })
            } else {
                let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle(`🚫 Fehler 🚫`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`<@${message.member.id}>, dazu hast du keine Rechte!`)
                    .setColor("RED")
                await message.channel.send(noPermEmbed)
            }

        } else if (message.channel.name.includes("📝-")) {
            if (message.member.roles.cache.get(carcreatorroleid) || message.member.roles.cache.get(teamrole)) {
                await message.channel.setName(`📝-ticket-${message.author.username}`)

                let acceptembed = new Discord.MessageEmbed()
                    .setTitle(`🔥 Auftragsstatus 🔥`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`Der <@&${teamrole}>, <@${message.author.id}> hat dein Ticket angenommen.`)
                    .setColor('RANDOM')
                message.channel.send(acceptembed).then(messageembed => {
                    messageembed.pin()
                })
            } else {
                let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle(`🚫 Fehler 🚫`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`<@${message.member.id}>, dazu hast du keine Rechte!`)
                    .setColor("RED")
                await message.channel.send(noPermEmbed)
            }
        }
    }
    if (message.content === ".payed") {
        if (message.channel.name.includes("📄-")) {
            if (message.member.roles.cache.get(plRole)) {
                await message.channel.setName(`📄-p-ticket-gesucht`)

                let acceptembed = new Discord.MessageEmbed()
                    .setTitle(`:fire: Zahlungsstatus :fire:`)
                    .setThumbnail("https://img.icons8.com/plasticine/2x/paypal.png")
                    .setDescription(`Der Status des Tickets wurde von <@${message.author.id}> auf Bezahlt geändert.`)
                    .setColor('RANDOM')

                message.channel.send(acceptembed).then(messageembed => {
                    messageembed.pin()
                })
            } else {
                let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle(`🚫 Fehler 🚫`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`<@${message.member.id}>, dazu hast du keine Rechte!`)
                    .setColor("RED")
                await message.channel.send(noPermEmbed)
            }
        }
    }
    if (message.content === ".ready") {
        if (message.channel.name.includes("📄-")) {
            if (message.member.roles.cache.get(carcreatorroleid) || message.member.roles.cache.get(teamrole)) {
                let acceptembed = new Discord.MessageEmbed()
                    .setTitle(`:fire: Auftragsstatus :fire:`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`Der Status des Tickets wurde von <@${message.author.id}> auf Fertig geändert. \n Du kannst das Auto nun im Support abholen.`)
                    .setColor('RANDOM')

                await message.channel.send(acceptembed).then(messageembed => {
                    messageembed.pin()
                })
            } else {
                let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle(`🚫 Fehler 🚫`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`<@${message.member.id}>, dazu hast du keine Rechte!`)
                    .setColor("RED")
                await  message.channel.send(noPermEmbed)
            }
        }
    }
    if (message.content === ".delete") {
        if (message.channel.name.includes("📄-") || message.channel.name.includes("📝-")) {
            if (message.member.roles.cache.get(carcreatorroleid) || message.member.roles.cache.get(teamrole)) {
                await message.channel.delete()
            } else {
                let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle(`🚫 Fehler 🚫`)
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")
                    .setDescription(`<@${message.member.id}>, dazu hast du keine Rechte!`)
                    .setColor("RED")
                await message.channel.send(noPermEmbed)
            }
        }
    }
});


bot.on('messageReactionAdd', async(reaction, client) => {

    if (client.bot) return;

    if (reaction.emoji.id === DoniCarChannelEmojiID) {
        if (reaction.message.channel.id === DoniCarChannelID) {
            await reaction.users.remove(client.id)

            let guild = reaction.message.guild;
            let server = reaction.message.guild;

            await guild.channels.create('📄-ticket-gesucht', {
                type: 'text',
                permissionOverwrites: [{
                    id: carcreatorroleid,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'EMBED_LINKS', 'MANAGE_CHANNELS']
                }, {
                    id: client.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'EMBED_LINKS']
                }, {
                    id: everyoneid,
                    deny: ['VIEW_CHANNEL']
                }]
            }).then(async(channel) => {
                let category = server.channels.cache.find(c => c.name == "─────────CC-Ticket────────" && c.type == "category");

                if (!category) throw new Error("Category channel does not exist");
                await channel.setParent(category.id, {
                    lockPermissions: false
                });

                await channel.send(`Pings:\n\n 1. <@${client.id}>\n2. <@&803391241789112381>`).then(async(undercoverping) => {
                    undercoverping.delete();
                })

                let createdEmbed = new Discord.MessageEmbed()
                    .setTitle(`🔥 ${client.username} 🔥`)
                    .setDescription(`Willkommen <@${client.id}>,
                    ein <@&${carcreatorroleid}> wurde bereits informiert, bitte suche dir auf dieser Website nun ein Auto deiner Wahl aus: https://de.gta5-mode.com/vehicles
                    
                    Um dieses Ticket zu schließen, reagiere mit 🔒`)
                    .setFooter("Liebe Grüße dein Spenden Support Team.")
                    .setColor('00FFFF')
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")

                await channel.send(createdEmbed).then(async(donimessage) => {
                    await donimessage.pin()
                    await  donimessage.react(TicketEmojizumLöschenID)
                })
            });

        }

    }


    if (reaction.emoji.id === TicketEmoji) {
        if (reaction.message.channel.id === TicketChannelID) {
            await reaction.users.remove(client.id)

            let guild = reaction.message.guild;
            let server = reaction.message.guild;

            await guild.channels.create('📝-ticketsupport-gesucht', {
                type: 'text',
                permissionOverwrites: [{
                    id: teamrole,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'EMBED_LINKS', 'MANAGE_CHANNELS']
                }, {
                    id: client.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'EMBED_LINKS']
                }, {
                    id: everyoneid,
                    deny: ['VIEW_CHANNEL']
                }]
            }).then(async(channel) => {
                let category = server.channels.cache.find(c => c.name == "─────────Ticket────────" && c.type == "category");

                if (!category) throw new Error("Category channel does not exist");
                await channel.setParent(category.id, {
                    lockPermissions: false
                });

                let createdEmbed = new Discord.MessageEmbed()
                    .setTitle(`🔥 ${client.username} 🔥`)
                    .setDescription(`Willkommen <@${client.id}>,
                    ein <@&${teamrole}> wurde informiert, bitte habe etwas Gedult und schildere schoneinmal dein Problem!`)
                    .setFooter("Liebe Grüße dein Spenden Support Team.")
                    .setColor('00FFFF')
                    .setThumbnail("https://cdn.discordapp.com/icons/803387433433301022/a_625b4d8aaaae35de3b8eda52d58694bc.webp?size=128")


                await channel.send(`Pings:\n\n 1. <@${client.id}>\n2. <@&804430949324292138>`).then(async(undercoverping) => {
                    undercoverping.delete();
                })

                await channel.send(createdEmbed).then(async(donimessage) => {
                    await donimessage.pin()
                    await donimessage.react(TicketEmojizumLöschenID)
                })
            });

        }

    }
    if (reaction.emoji.id === TicketEmojizumLöschenID) {
        if (client.bot) return;
        var channelname = reaction.message.channel.name;
        if (channelname.includes("📝-")) {
            await reaction.message.channel.delete()
        }

    }

    if (reaction.emoji.id === TicketEmojizumLöschenID) {
        if (client.bot) return;
        var channelname = reaction.message.channel.name;
        if (channelname.includes("📄-")) {
            await reaction.message.channel.delete()
        }

    }


})

bot.login(botconfig["bot_setup"].token);


// Developed by LvckyWorld & NightTech