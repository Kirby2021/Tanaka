const{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch");module.exports=class FactCommand extends Command{constructor(e){super(e,{name:"fact",aliases:["random-fact"],group:"random",memberName:"fact",description:"Responds with a random fact.",clientPermissions:["EMBED_LINKS"]})}async run(e){const a=await e.say("Fetching...."),{body:t}=await request.get("https://api.1chi.tk/fact").set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"}),s=(new MessageEmbed).setDescription(`\`\`\`${t.fact}\`\`\``).setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0,size:4096})).setTimestamp();return a.edit(s)}};
//# sourceMappingURL=fact.js.map
