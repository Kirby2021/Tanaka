const AdblockPlugin=require("puppeteer-extra-plugin-adblocker").default,StealthPlugin=require("puppeteer-extra-plugin-stealth"),puppeteer=require("puppeteer-extra").default;puppeteer.use(StealthPlugin()),puppeteer.use(AdblockPlugin({blockTrackers:!0}));const screenshot=async e=>{try{const t=await puppeteer.launch({headless:!0,args:["--no-sandbox","--disable-gpu","--single-process"]}),r=await t.newPage();await r.setViewport({width:1920,height:1080}),await r.goto(e,{waitUntil:"networkidle2"}),await r.waitForTimeout(5e3);const a=await r.screenshot(),i={title:await r.title(),buffer:a};return await t.close(),i}catch(e){throw new Error(e)}};module.exports={screenshot:screenshot};
//# sourceMappingURL=Puppeteer.js.map
