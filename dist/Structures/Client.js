const{CommandoClient:CommandoClient}=require("discord.js-commando"),{Database:Database}=require("quickmongo"),{Intents:Intents}=require("discord.js"),consola=require("consola");module.exports=class Client extends CommandoClient{constructor(){super({commandPrefix:process.env.COMMAND_PREFIX,owner:process.env.OWNER_ID,intents:[Intents.NON_PRIVILEGED,Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_PRESENCES],partials:["CHANNEL"]}),this.db=new Database(process.env.MONGO_URL,"tanaka",{useNewUrlParser:!0,useUnifiedTopology:!0}),this.logger=consola.create({level:5})}async login(e=process.env.DISCORD_TOKEN){return super.login(e)}};
//# sourceMappingURL=Client.js.map
