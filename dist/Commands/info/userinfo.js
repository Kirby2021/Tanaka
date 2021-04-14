const{userFlags:userFlags,trimArray:trimArray}=require("../../Structures/Util"),{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),moment=require("moment");module.exports=class UserInfoCommand extends Command{constructor(e){super(e,{name:"userinfo",aliases:["user","user-info"],group:"info",memberName:"userinfo",description:"Responds with the user's general information.",clientPermissions:["EMBED_LINKS"],guildOnly:!0,args:[{key:"member",prompt:"Who is the user that you want to get info of?",type:"member",default:e=>e.member}]})}run(e,{member:r}){const s=r.roles.cache.sort(((e,r)=>r.position-e.position)).map((e=>e.toString())).slice(0,-1),t=r.user.flags.toArray(),o=(new MessageEmbed).setTitle(`**User Information for __${e.author.tag}__**`).setThumbnail(r.user.displayAvatarURL({dynamic:!0,size:4096})).setColor("RANDOM").addField("User",[`**❯ Username**: ${r.user.username}`,`**❯ Discriminator:** ${r.user.discriminator}`,`**❯ ID:** \`${r.id}\``,`**❯ Flags:** ${t.length?t.map((e=>userFlags[e])).join(", "):"None"}`,`**❯ Avatar:** [Link to Avatar](${r.user.displayAvatarURL({size:4096,dynamic:!0})})`,`**❯ Time Created:** \`${moment(r.user.createdTimestamp).format("LT")} ${moment(r.user.createdTimestamp).format("LL")} ${moment(r.user.createdTimestamp).fromNow()}\``,`**❯ Status:** ${r.user.presence.status}`,`**❯ Game:** ${r.user.presence.game||"Not playing a game."}`,"**❯ Bot:** "+(r.user.bot?"Yes":"No"),"​"]).addField("Member",[`**❯ Highest Role:** ${r.roles.highest.id===e.guild.id?"None":r.roles.highest.name}`,`**❯ Server Join Rate:** \`${moment(r.joinedAt).format("LL LTS")}\``,`**❯ Nickname:** ${r.nickname??"None"}`,`**❯ Hoist Role:** ${r.roles.hoist?r.roles.hoist.name:"None"}`,`**❯ Roles [${s.length}]:** ${s.length<10?s.join(", "):s.length>10?trimArray(s):"None"}`]).setTimestamp();return e.say(o)}};
//# sourceMappingURL=userinfo.js.map
