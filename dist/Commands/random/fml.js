const{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch"),cheerio=require("cheerio");module.exports=class FMLCommand extends Command{constructor(e){super(e,{name:"fml",aliases:["fuck-my-life"],group:"random",memberName:"fml",description:"Responds with a random FML quote.",clientPermissions:["EMBED_LINKS"],throttling:{usages:5,duration:15}})}async run(e){const t=await e.say("Fetching...."),{text:s}=await request.get("https://fmylife.com/random").set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"}),a=cheerio.load(s,{normalizeWhitespace:!0})("a.article-link").first().text().trim(),r=(new MessageEmbed).setDescription(`\`\`\`\n${a}\n\`\`\``).setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0,size:4096})).setColor("RANDOM").setTimestamp();return t.edit(r)}};
//# sourceMappingURL=fml.js.map
