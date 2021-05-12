const{MessageEmbed:MessageEmbed,WebhookClient:WebhookClient}=require("discord.js"),KeyvProvider=require("commando-provider-keyv"),{htmlToText:htmlToText}=require("html-to-text"),Client=require("./Structures/Client"),path=require("path"),client=new Client;client.setProvider(new KeyvProvider(client.db)),client.registry.registerDefaultTypes().registerGroups([{id:"util",name:"Utility",guarded:!0},{id:"random",name:"Random Response"},{id:"info",name:"Information"},{id:"search",name:"Search"},{id:"remind",name:"Reminder"},{id:"anime-updates",name:"Anime Updates"},{id:"codebin",name:"Code Bins"},{id:"img",name:"Image Manipulation"},{id:"music",name:"Music"}]).registerDefaultGroups().registerDefaultCommands({unknownCommand:!1,help:!1,eval:!1,ping:!1}).registerTypesIn(path.join(__dirname,"Types")).registerCommandsIn(path.join(__dirname,"Commands")),client.once("ready",(async()=>{client.setTimeout((()=>client.manager.init(client.user.id)),5e3),await client.timers.fetchAll();const e=[`${client.guilds.cache.reduce(((e,n)=>e+n.memberCount),0)} users`,`${client.registry.commands.size} commands`,`${client.guilds.cache.size} guilds`,"https://tanaka.1chi.tk"],n=`t!help | ${e[Math.floor(Math.random()*e.length)]}`;client.setInterval((()=>client.user.setActivity(n,{type:"WATCHING"})),3e4),client.logger.info(`Logged in as ${client.user.tag}.`)})),client.on("debug",client.logger.debug),client.on("error",(e=>client.logger.error(e.stack))),client.on("raw",(e=>client.manager.updateVoiceState(e))),client.db.on("error",(e=>client.logger.error(e))),client.rss.on("item:new:anime",(e=>{client.guilds.cache.forEach((async n=>{n.available||(n=await client.guilds.fetch(n.id));const t=await client.db.get(`animeUpdates-${n.id}`);if(null===t)return!1;const i=new WebhookClient(t.id,t.token),r=(new MessageEmbed).setTitle(`**${e.title}**`).setDescription(htmlToText(e.description)).setURL(e.link).setColor("RANDOM").setImage("https://i.imgur.com/R3JCtNK.jpg").setTimestamp();i.send(r)}))})),client.manager.on("nodeConnect",(e=>client.logger.info(`Node "${e.options.identifier}" connected.`))),client.manager.on("nodeError",((e,n)=>client.logger.error(`Node "${e.options.identifier}" encountered an error: ${n.message}.`))),client.manager.on("trackStart",((e,n)=>{client.channels.cache.get(e.textChannel).send(`Now playing: \`${n.title}\`, requested by ${n.requester.tag}`)})),client.manager.on("queueEnd",(e=>{const n=client.channels.cache.get(e.textChannel),t=new MessageEmbed({description:"The queue has ended.",color:"RANDOM"});n.send(t),e.destroy()})),client.login(),module.exports=client;
//# sourceMappingURL=index.js.map
