const{CommandoClient:CommandoClient}=require("discord.js-commando"),{Intents:Intents,WebhookClient:WebhookClient}=require("discord.js"),{FeedEmitter:FeedEmitter}=require("rss-emitter-ts"),TimerManager=require("./TimerManager"),{Database:Database}=require("quickmongo"),{html:html}=require("common-tags"),Turndown=require("turndown"),consola=require("consola"),Redis=require("./Redis"),web=require("../Web");module.exports=class extends CommandoClient{constructor(){super({commandPrefix:process.env.COMMAND_PREFIX,owner:process.env.OWNER_ID,intents:[Intents.NON_PRIVILEGED,Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_PRESENCES],partials:["CHANNEL"]}),this.db=new Database(process.env.MONGO_URL,"tanaka",{useNewUrlParser:!0,useUnifiedTopology:!0}),this.logger=consola.create({level:5}),this.rss=new FeedEmitter,this.testWebhook=new WebhookClient(process.env.TEST_WEBHOOK_ID,process.env.TEST_WEBHOOK_TOKEN),this.redis=new Redis(this).db,this.timers=new TimerManager(this),this.converter=new Turndown}async login(e=process.env.DISCORD_TOKEN){return this.addRSSListeners(),web(this),super.login(e)}addRSSListeners(){[{url:"https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us",refresh:2e4,eventName:"anime",ignoreFirst:!0}].forEach((e=>this.rss.add(e)))}generateCommands(){const e=this.registry.groups.map((e=>{const n=e.commands.filter((e=>!e.hidden));return`\n<h3>${e.name}:</h3>\n\n<ul>${n.map((e=>{const n=`${e.ownerOnly?" (Owner-Only)":""}${e.nsfw?" (NSFW)":""}`;return`<li><strong>${e.name}:</strong> ${e.description}${n}</li>`})).join("\n")}</ul>`})).join("\n");return html` ${e} `}};
//# sourceMappingURL=Client.js.map
