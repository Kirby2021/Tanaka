const{isUrl:isUrl}=require("../../Structures/Util"),{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch");module.exports=class extends Command{constructor(e){super(e,{name:"ocr",aliases:["optical-character-recognition"],group:"search",memberName:"ocr",description:"Lists the text in an image.",clientPermissions:["EMBED_LINKS"],args:[{key:"image",prompt:"What image would you like to search?",type:"image",validate:e=>!isUrl(e)}],throttling:{usages:2,duration:60}})}async run(e,{image:r}){try{const{body:s}=await request.get("https://api.ocr.space/parse/imageurl").query({apikey:process.env.OCR_KEY,url:r,ocrengine:2}),t=s.ParsedResults[0].ParsedText;if(0===t.length)return e.say("Couldn't find any text.");const a=(new MessageEmbed).setImage(r).setColor("RANDOM").setDescription(t).setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0})).setTimestamp();return e.embed(a)}catch(r){return e.reply(`An error occured: \`${r.message}\`.`)}}};
//# sourceMappingURL=ocr.js.map
