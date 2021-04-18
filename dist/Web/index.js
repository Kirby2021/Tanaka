const OAuthClient=require("disco-oauth"),express=require("express"),morgan=require("morgan"),path=require("path"),cors=require("cors"),app=express(),client=new OAuthClient(process.env.CLIENT_ID,process.env.CLIENT_SECRET).setRedirect("https://tanaka-production.up.railway.app/auth/callback").setScopes("identify"),uri="https://discord.com/api/oauth2/authorize?client_id=804605929944645672&redirect_uri=https%3A%2F%2Ftanaka-production.up.railway.app%2Fauth%2Fcallback&response_type=code&scope=identify";app.use(cors()),app.use(express.json()),app.use(express.urlencoded({extended:!0})),app.use(express.text()),app.use(morgan("combined")),app.set("view engine","ejs"),app.set("trust proxy",!0),app.set("json spaces",8),app.set("views",path.join(__dirname,"views")),app.get("/",(async(e,s)=>{let t=null;return void 0!==e.cookies.discordToken&&(t=await client.getUser(e.cookies.discordToken)),s.status(200).render("index",{data:t})})),app.get("/auth/login",((e,s)=>e.cookies.discordToken?s.redirect(302,"/"):s.redirect(302,uri))),app.get("/auth/callback",(async(e,s)=>{if(e.cookies.discordToken)return s.redirect(302,"/");const t=e.query.code,r=await client.getAccess(t);return s.cookie("discordToken",r,{maxAge:6048e5}),s.redirect(302,"/")})),app.get("/auth/logout",((e,s)=>(s.cookie("discordToken",null,{maxAge:-1}),s.redirect(302,"/")))),module.exports=()=>app.listen(process.env.PORT,(()=>console.log("Website is ready!")));
//# sourceMappingURL=index.js.map
