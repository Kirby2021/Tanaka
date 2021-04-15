module.exports=class TimerManager{constructor(t){Object.defineProperty(this,"client",{value:t}),this.timeouts=new Map}async fetchAll(){const t=await this.client.redis.hgetall("timer");for(let e of Object.values(t))e=JSON.parse(e),await this.setTimer(e.channelID,new Date(e.time)-new Date,e.userID,e.title,!1);return this}async setTimer(t,e,i,s,n=!0){const r={time:new Date(Date.now()+e).toISOString(),channelID:t,userID:i,title:s},a=this.client.setTimeout((async()=>{try{const e=await this.client.channels.fetch(t);await e.send(`🕰️ Hey <@${i}>, you wanted me to remind you of: **"${s}"**.`)}finally{await this.client.redis.hdel("timer",`${t}-${i}`)}}),e);return n&&await this.client.redis.hset("timer",{[`${t}-${i}`]:JSON.stringify(r)}),this.timeouts.set(`${t}-${i}`,a),a}deleteTimer(t,e){return this.client.clearTimeout(this.timeouts.get(`${t}-${e}`)),this.timeouts.delete(`${t}-${e}`),this.client.redis.hdel("timer",`${t}-${e}`)}exists(t,e){return this.client.redis.hexists("timer",`${t}-${e}`)}};
//# sourceMappingURL=TimerManager.js.map