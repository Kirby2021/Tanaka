const{Command:Command}=require("discord.js-commando");module.exports=class AnimeUpdatesCommand extends Command{constructor(e){super(e,{name:"anime-updates",aliases:["anime-up","set-anime-updates"],group:"anime-updates",memberName:"anime-updates",description:"Sets the anime updates channel.",clientPermissions:["MANAGE_WEBHOOKS"],userPermissions:["MANAGE_GUILD"],guildOnly:!0,args:[{key:"channel",prompt:"What channel would you like to set up the updates?",type:"text-channel"}]})}async run(e,{channel:a}){const n=await a.createWebhook("Tanaka | Anime Updates",{avatar:this.client.user.displayAvatarURL({size:4096}),reason:"Anime Updates"});return await this.client.db.set(`animeUpdates-${e.guild.id}`,{token:n.token,id:n.id}),e.say(`The anime updates channel has been set to: <#${a.id}>!`)}};
//# sourceMappingURL=anime-updates.js.map