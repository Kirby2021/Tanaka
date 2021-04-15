const{toPercent:toPercent,formatBytes:formatBytes}=require("../../Structures/Util"),{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch"),moment=require("moment");module.exports=class NPMCommand extends Command{constructor(e){super(e,{name:"npm",aliases:["npm-search"],group:"search",memberName:"npm",description:"Searches NPMJS for your query.",clientPermissions:["EMBED_LINKS"],args:[{key:"query",prompt:"What is your query?",type:"string",parse:e=>encodeURIComponent(e)}],throttling:{usages:5,duration:15}})}async run(e,{query:t}){const n=await e.embed({description:"Fetching...."}),{body:s}=await request.get("https://api.npms.io/v2/search").query({q:t,size:1}).set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"});if(0===s.total)return n.edit({embed:{description:"Could not find any results."}});const{body:a}=await request.get(`https://api.npms.io/v2/package/${s.results[0].name}`).set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"}),i=[],o=[],r=[],d=a.collected.metadata,{score:c,npm:m,source:u}=a.collected,l=d.dependencies??null,p=d.devDependencies??null;if(null!==l)for(const e of Object.keys(l))o.push(e);if(null!==p)for(const e of Object.keys(p))r.push(e);d.maintainers.forEach((e=>i.push(e.username)));const h=(new MessageEmbed).setAuthor("NPM","https://github.com/PKief/vscode-material-icon-theme/raw/master/icons/npm.svg","https://npmjs.com").setTitle(d.name).setURL(d.links.npm).setDescription(d.description).addField("❯ Version",d.version,!0).addField("❯ Author",d.author?d.author.name:"Unknown",!0).addField("❯ License",d.license??"None",!0).addField("❯ Modification Date",moment(d.date).format("MMMM Do YYYY, h:mm:ss a"),!0).addField("❯ Dependents",m.dependentsCount,!0).addField("❯ README Size",formatBytes(u.files.readmeSize),!0).addField("❯ Quality",toPercent(c.detail.quality),!0).addField("❯ Popularity",toPercent(c.detail.popularity),!0).addField("❯ Maintenance",toPercent(c.detail.maintenance),!0).addField("❯ Maintainers",i.join(", ")).addField("❯ Dependencies",o.join(", ")??"None").addField("❯ Dev Dependencies",r.join(", ")??"None").setFooter(d.keywords.join("\n"),"").setColor("#cb3837").setTimestamp();return n.edit(h)}};
//# sourceMappingURL=npm.js.map
