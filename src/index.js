import { utils } from "./utils"
import { PuppeteerCore } from "./puppeteer/core"
import { OpenCvCore } from "./opencv/core"
import { WebSocketServer } from 'ws';
import {
    goToFarm,
    goToPasture,
    goToFishpond,
    runLoop,
    screenshotTxt
} from "./logic";
const config = utils.readConfig(utils.getPath("./../config.json"))
global.config = config
let pc = new PuppeteerCore();
let cvc = new OpenCvCore();
global.pc = pc;
global.cvc = cvc;
global.ws = null;
global.wss = null;




(async () => {
    // console.log(fB);



    await pc.createBrowser(config.chromePath);
    await pc.createPage()
    await pc.closeFirstPage()
    const wss = new WebSocketServer({ port: 5964 });
    wss.on('connection', async function connection(ws) {
        ws.on('error', console.error);

        ws.on('message', async function message(data, isBinary) {
            console.log('received: %s', data);
            let obj = JSON.parse(data)
            if (obj.type == "goToFarm") {
                pc.page.bringToFront()
                await goToFarm()
            } else if (obj.type == "goToPasture") {

                pc.page.bringToFront()
                await goToPasture()
            } else if (obj.type == "goToFishpond") {

                pc.page.bringToFront()
                await goToFishpond()
            } else if (obj.type == "runLoop") {
                pc.page.bringToFront()
                runLoop()
            } else if (obj.type == "dblclick") {
                pc.mouseDblClick(obj.x, obj.y).then(() => {
                    ws.send("ok");
                })
            }
        });
        global.ws = ws;
    });

    global.wss = wss

    await pc.createConfigPage()

    // let txts = await screenshotTxt("./use/btn1.png")
    // console.log(txts)
    // console.log(pc.browser)
    // let img = await pc.screenshot({
    //     "path": utils.getPath("./aaa.png")
    // })
    // let templ = await cvc.readBufferFromFile(utils.getPath("./temp1/btn1.png"))

    // let rect = await cvc.findImgRect(img, templ)
    // let img2 = sharp(img)

    // let im = cv.imread(img)
    // cv.matFromArray(img.height, img.width, cv.CV_8UC4, new Uint8ClampedArray(img.data))

    // console.log(img2)
})()

