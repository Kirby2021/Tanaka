const AdblockPlugin=require("puppeteer-extra-plugin-adblocker").default,StealthPlugin=require("puppeteer-extra-plugin-stealth"),puppeteer=require("puppeteer-extra").default;puppeteer.use(StealthPlugin()),puppeteer.use(AdblockPlugin({blockTrackers:!0}));const screenshot=async e=>{try{const t={"accept-language":"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,it;q=0.5","accept-encoding":"gzip, deflate, br",accept:"text/html,application/xhtml+xml,application/json,text/plain,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"},a=await puppeteer.launch({headless:!0,args:["--no-sandbox","--disable-gpu","--single-process","--disable-dev-shm-usage"]}),i=await a.newPage();await i.setViewport({width:1920,height:1080}),await i.setExtraHTTPHeaders(t),await i.goto(e,{waitUntil:["load","domcontentloaded"]}),await i.waitForTimeout(5e3);const p=await i.screenshot(),r={title:await i.title(),buffer:p};return await a.close(),r}catch(e){throw new Error(e)}};module.exports={screenshot:screenshot};
//# sourceMappingURL=Puppeteer.js.map
