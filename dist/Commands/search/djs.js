const{Command:Command}=require("discord.js-commando"),request=require("node-superfetch");module.exports=class extends Command{constructor(e){super(e,{name:"djs",aliases:["discord.js","djs-docs","discord.js-docs"],memberName:"djs",group:"search",description:"Searches the discord.js documentation for your query.",args:[{key:"query",prompt:"What would you like to search for?",type:"string"},{key:"branch",prompt:"What branch of discord.js would you like to use?",type:"string",oneOf:["stable","master","commando","rpc","akairo","akairo-master","collection"],default:"stable"}]})}async run(e,{query:r,branch:s}){try{const{body:o}=await request.get("https://djsdocs.sorta.moe/v2/embed").query({src:s,q:encodeURIComponent(r)});return null===o?e.say("Couldn't find any results for that."):e.embed(o)}catch(r){return 404===r.status?e.say("Couldn't find any results for that."):e.reply(`An error occured: \`${r.message}\`.`)}}};
//# sourceMappingURL=djs.js.map