const{MongoDBProvider:MongoDBProvider}=require("commando-provider-mongo"),{MessageEmbed:MessageEmbed,WebhookClient:WebhookClient}=require("discord.js"),{htmlToText:htmlToText}=require("html-to-text"),Client=require("./Structures/Client"),{MongoClient:MongoClient}=require("mongodb"),path=require("path"),client=new Client;client.setProvider(MongoClient.connect(client.db.url,{useUnifiedTopology:!0,useNewUrlParser:!0}).then((e=>new MongoDBProvider(e,"tanaka")))),client.registry.registerDefaultTypes().registerGroups([{id:"util",name:"Utility",guarded:!0},{id:"random",name:"Random Response"},{id:"info",name:"Information"},{id:"search",name:"Search"},{id:"remind",name:"Reminder"},{id:"anime-updates",name:"Anime Updates"},{id:"codebin",name:"Code Bins"},{id:"img",name:"Image Manipulation"},{id:"music",name:"Music"}]).registerDefaultGroups().registerDefaultCommands({unknownCommand:!1,help:!1,eval:!1,ping:!1}).registerTypesIn(path.join(__dirname,"Types")).registerCommandsIn(path.join(__dirname,"Commands")),client.once("ready",(async()=>{client.manager.init(client.user.id),await client.timers.fetchAll();const e=[`${client.guilds.cache.reduce(((e,n)=>e+n.memberCount),0)} users`,`${client.registry.commands.size} commands`,`${client.guilds.cache.size} guilds`],n=`t!help | ${e[Math.floor(Math.random()*e.length)]}`;client.setInterval((()=>client.user.setActivity(n,{type:"WATCHING"})),3e4),client.logger.info(`Logged in as ${client.user.tag}.`)})),client.on("debug",client.logger.debug),client.on("error",(e=>client.logger.error(e.stack))),client.on("raw",(e=>client.manager.updateVoiceState(e))),client.db.once("ready",(()=>client.logger.info("MongoDB is ready!"))),client.db.on("debug",client.logger.debug),client.db.on("error",(e=>client.logger.error(e.stack))),client.rss.on("item:new:anime",(e=>{client.guilds.cache.forEach((async n=>{const t=await client.db.get(`animeUpdates-${n.id}`);if(null===t)return!1;const i=new WebhookClient(t.id,t.token),o=(new MessageEmbed).setTitle(`**${e.title}**`).setDescription(htmlToText(e.description)).setURL(e.link).setColor("RANDOM").setImage("https://kevinpennyfeather.files.wordpress.com/2018/03/logo.jpg").setTimestamp();i.send(o)}))})),client.manager.on("nodeConnect",(e=>client.logger.info(`Node "${e.options.identifier}" connected.`))),client.manager.on("nodeError",((e,n)=>client.logger.error(`Node "${e.options.identifier}" encountered an error: ${n.message}.`))),client.manager.on("trackStart",((e,n)=>{const t=client.channels.cache.get(e.textChannel),i=(new MessageEmbed).setTitle(`**Now Playing: __${n.title}__**`).setURL(n.uri).setImage(n.thumbnail||"").setAuthor(n.author).setColor("RANDOM").setFooter(`Requested by: ${n.requester.tag}`).setTimestamp();t.send(i)})),client.manager.on("queueEnd",(e=>{const n=client.channels.cache.get(e.textChannel),t=new MessageEmbed({description:"The queue has ended.",color:"RANDOM"});n.send(t),e.destroy()})),client.login();
//# sourceMappingURL=index.js.map
