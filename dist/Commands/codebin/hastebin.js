const{Command:Command}=require("discord.js-commando"),request=require("node-superfetch");module.exports=class extends Command{constructor(e){super(e,{name:"hastebin",group:"codebin",memberName:"hastebin",description:"Uploades your code to https://hastebin.com.",args:[{key:"code",prompt:"What is the code that you want to upload?",type:"code"}]})}async run(e,{code:t}){try{const{body:o}=await request.post("https://hastebin.com/documents").send(t.code).set({"User-Agent":"TanakaBot (https://github.com/1chiSensei/Tanaka)","Content-Type":"text/plain"});return e.embed({description:`The link to the code is [\`here\`](https://hastebin.com/${o.key}.txt)!`})}catch{return e.say("The Hastebin API returned an error. Please try again later.")}}};
//# sourceMappingURL=hastebin.js.map
