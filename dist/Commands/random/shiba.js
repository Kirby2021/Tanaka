const{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch");module.exports=class ShibaCommand extends Command{constructor(e){super(e,{name:"shiba",aliases:["random-shiba"],group:"random",memberName:"shiba",description:"Responds with a random shiba inu image.",clientPermissions:["EMBED_LINKS"],throttling:{usages:5,duration:15}})}async run(e){const s=await e.embed({description:"Fetching...."}),{body:a}=await request.get("https://shibe.online/api/shibes").set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"}),t=(new MessageEmbed).setImage(a[0]).setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0,size:4096})).setColor("RANDOM").setTimestamp();return s.edit(t)}};
//# sourceMappingURL=shiba.js.map