const{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch"),FormData=require("form-data");module.exports=class extends Command{constructor(e){super(e,{name:"ocr",aliases:["optical-character-recognition"],group:"search",memberName:"ocr",description:"Lists the text in an image.",clientPermissions:["EMBED_LINKS"],args:[{key:"image",prompt:"What image would you like to search?",type:"image"}],throttling:{usages:2,duration:60}})}async run(e,{image:s}){try{const r=(new FormData).append("url",s),{body:t}=await request.post("https://api.ocr.space/parse/image").set({apiKey:process.env.OCR_KEY}).send(r);if(0===t.ParsedResults[0].ParsedText.length)return e.say("Couldn't find any text.");const a=(new MessageEmbed).setImage(s).setColor("RANDOM").setDescription(t.ParsedResults[0].ParsedText).setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0})).setTimestamp();return e.embed(a)}catch(s){return e.reply(`An error occured: \`${s.message}\`.`)}}};
//# sourceMappingURL=ocr.js.map
