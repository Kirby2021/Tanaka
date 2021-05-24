const{Intents:Intents,WebhookClient:WebhookClient,Collection:Collection}=require("discord.js"),{MongoDBProvider:MongoDBProvider}=require("commando-provider-mongo"),{CommandoClient:CommandoClient}=require("discord.js-commando"),TimerManager=require("./TimerManager"),{execSync:execSync}=require("child_process"),{Velocity:Velocity}=require("velocity-api"),{MongoClient:MongoClient}=require("mongodb"),{Database:Database}=require("quickmongo"),{Manager:Manager}=require("erela.js"),OpenEval=require("open-eval"),glob=require("glob-promise"),Turndown=require("turndown"),snoowrap=require("snoowrap"),BotList=require("./BotList"),logger=require("./Logger"),Redis=require("./Redis"),web=require("../Web"),path=require("path");module.exports=class extends CommandoClient{constructor(e){super({commandPrefix:process.env.COMMAND_PREFIX,owner:process.env.OWNER_ID,intents:[Intents.NON_PRIVILEGED,Intents.FLAGS.GUILDS],partials:["CHANNEL"],allowedMentions:{repliedUser:!1,parse:["roles","users"]},...e}),this.db=new Database(process.env.MONGO_URI,"tanaka",{useNewUrlParser:!0,useUnifiedTopology:!0}),this.logger=logger,this.testWebhook=new WebhookClient(process.env.TEST_WEBHOOK_ID,process.env.TEST_WEBHOOK_TOKEN),this.redis=new Redis(this).db,this.timers=new TimerManager(this),this.converter=new Turndown,this.bl=new BotList(this),this.client=this,this.manager=new Manager({send:(e,n)=>{const r=this.guilds.cache.get(e);r&&r.shard.send(n)}}),this.events=new Collection,this.piston=new OpenEval,this.reddit=new snoowrap({userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2869.0 Safari/537.36",username:"TomioCodes",password:process.env.REDDIT_PASSWORD,clientId:process.env.REDDIT_CLIENT_ID,clientSecret:process.env.REDDIT_CLIENT_SECRET}),this.perspective=new Velocity(process.env.PERSPECTIVE_KEY)}get ip(){return execSync("curl https://ipecho.net/plain",{timeout:3e4,encoding:"utf-8"})}get directory(){return`${path.dirname(require.main.filename)}${path.sep}`}async userCount(){if(this.shard){return(await this.shard.broadcastEval("this.guilds.cache.reduce((a, b) => a + b.memberCount, 0)")).reduce(((e,n)=>e+n),0)}return this.guilds.cache.reduce(((e,n)=>e+n.memberCount),0)}async guildCount(){if(this.shard){return(await this.shard.fetchClientValues("guilds.cache.size")).reduce(((e,n)=>e+n),0)}return this.guilds.cache.size}async channelCount(){if(this.shard){return(await this.shard.fetchClientValues("channels.cache.size")).reduce(((e,n)=>e+n),0)}return this.channels.cache.size}async login(e=process.env.DISCORD_TOKEN){return this.registerCommands(),web(this),await this.loadEvents(),await this.registerProvider(),super.login(e)}async loadEvents(){const e=await glob(`${this.directory}Events/**/*.js`);for(const n of e){delete require.cache[n];const e=new(require(n))(this.client);this.events.set(e.name,e),e.emitter[e.type](e.name,((...n)=>e.run(...n)))}}generateCommandList(){return this.registry.groups.map((e=>{const n=e.commands.filter((e=>!e.hidden));return`\n<h3>${e.name}:</h3>\n\n<ul>${n.map((e=>{const n=`${e.ownerOnly?" (Owner-Only)":""}${e.nsfw?" (NSFW)":""}`;return`<li> <strong>${e.name}:</strong> ${e.description}${n}</li>`})).join("</ul>\n")}`})).join("\n")}registerCommands(){this.client.registry.registerDefaultTypes().registerGroups([{id:"util",name:"Utility",guarded:!0},{id:"random",name:"Random Response"},{id:"info",name:"Information"},{id:"search",name:"Search"},{id:"remind",name:"Reminder"},{id:"anime-updates",name:"Anime Updates"},{id:"codebin",name:"Code Bins"},{id:"img",name:"Image Manipulation"},{id:"music",name:"Music"},{id:"nsfw",name:"NSFW"}]).registerDefaultGroups().registerDefaultCommands({unknownCommand:!1,help:!1,eval:!1,ping:!1,commandState:!1,prefix:!1}).registerTypesIn(path.join(__dirname,"..","Types")).registerCommandsIn(path.join(__dirname,"..","Commands"))}async registerProvider(){const e=await MongoClient.connect(process.env.MONGO_URI,{useNewUrlParser:!0,useUnifiedTopology:!0});this.setProvider(new MongoDBProvider(e,"tanaka"))}};
//# sourceMappingURL=Client.js.map
