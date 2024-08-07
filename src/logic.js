import { PNG } from "pngjs";
import { utils } from "./utils";
import fs from "fs";
const { fork } = require('child_process');

export const msgType = {
    log: "log",
    error: "error",
    warn: "warn",
    success: "success",
}
export function printLog(msg, type) {
    ws.send(JSON.stringify({
        type: type || msgType.log,
        msg: msg || ""
    }));
}

export async function goToFarm() {
    let nowTime = new Date().getTime();
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    // printLog("等待3秒...", msgType.error)
    for (var i = 0; i < 1; i++) {
        printLog("等待1秒...", msgType.error)
        await utils.sleep(1)
        // printLog("等待3秒...", msgType.error)
    }
    await pyautogui.press("r")
    printLog("开始走到农场...")
    pyautogui.keyDown("a")
    pyautogui.keyDown("w")
    await sleep(4.8)
    pyautogui.keyUp("a")
    pyautogui.keyUp("w")

    pyautogui.keyDown("d")
    await sleep(0.8)
    pyautogui.keyUp("d")

    printLog("到达农场", msgType.success)
    return new Date().getTime() - nowTime;
}
export async function goToPasture() {
    let nowTime = new Date().getTime();
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    // printLog("等待3秒...", msgType.error)
    for (var i = 0; i < 1; i++) {
        printLog("等待1秒...", msgType.error)
        await utils.sleep(1)
        // printLog("等待3秒...", msgType.error)
    }
    await pyautogui.press("r")
    printLog("开始走到牧场...")
    pyautogui.keyDown("w")
    await sleep(0.8)
    pyautogui.keyDown("d")
    await sleep(1.7)
    pyautogui.keyUp("w")
    pyautogui.keyUp("d")
    printLog("到达牧场", msgType.success)
    return new Date().getTime() - nowTime;
}

export async function goToFishpond() {

    let nowTime = new Date().getTime();
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    // printLog("等待3秒...", msgType.error)
    for (var i = 0; i < 1; i++) {
        printLog("等待1秒...", msgType.error)
        await utils.sleep(1)
    }
    await pyautogui.press("r")
    printLog("开始走到鱼塘...")
    pyautogui.keyDown("w")
    pyautogui.keyDown("a")
    await sleep(0.5)
    pyautogui.keyUp("a")
    await sleep(2.2)
    pyautogui.keyDown("d")
    await sleep(0.8)
    pyautogui.keyUp("d")
    await sleep(3.2)
    pyautogui.keyUp("w")
    printLog("到达鱼塘", msgType.success)
    return new Date().getTime() - nowTime;
}

export async function findDrone() {
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    printLog("寻找无人机")
    await pyautogui.press("r")
    // # print_nol("寻找无人机")
    pyautogui.keyDown("a")
    await sleep(1.2)
    pyautogui.keyUp("a")
}

export async function farmWork() {
    let pyautogui = global.pc;
    // let sleep = utils.sleep;
    await findDrone()
    printLog("无人机前往农场工作")
    await pyautogui.press("q")
}
export async function pastureWork() {
    let pyautogui = global.pc;
    // let sleep = utils.sleep;
    await findDrone()
    printLog("无人机前往牧场工作")
    await pyautogui.press("e")
}
export async function wander(n) {
    let endNum = n * 1000
    let nowTime = 0
    let sleep = utils.sleep;
    while (true) {
        let random = Math.random()
        if (random > 0.0 && random <= 0.2) {
            nowTime += await goToFarm()
        } else if (random > 0.2 && random <= 0.4) {
            nowTime += await goToPasture()
        } else if (random > 0.4 && random <= 0.6) {
            nowTime += await goToFishpond()
        } else if (random > 0.6 && random <= 1) {
            nowTime += 3000
            printLog("等待时间3s", msgType.error)
            await sleep(3)
        }
        nowTime += 1000
        await sleep(1)
        if (nowTime > endNum) {
            break;
        }
    }

}


export async function runLoop() {
    let loopTime = 120 * 1000
    while (true) {
        let now = new Date().getTime()
        await farmWork()
        await wander(40)
        await pastureWork()
        await wander(25)
        let useTime = (new Date().getTime() - now)
        printLog("任务结束：运行时间" + (new Date().getTime() - now) + "毫秒", msgType.success)
        printLog("下次运行：" + (loopTime - useTime) + "毫秒", msgType.success)
        await wander((loopTime - useTime) / 1000)
    }
}
export async function screenshotTxt(path) {
    return new Promise(async (resolve, reject) => {
        let pyautogui = global.pc;
        let img = await pyautogui.screenshot()
        let templ = await cvc.readBufferFromFile(utils.getPath(path))
        let rect = await cvc.findImgRect(img, templ)
        let png = await PNG.sync.read(img)
        let dst = new PNG({
            width: rect.width,
            height: rect.height
        })
        try {
            PNG.bitblt(png, dst, rect.x, rect.y, rect.width, rect.height, 0, 0)
            let callBuffer = await PNG.sync.write(dst);
            fs.writeFileSync(utils.getPath("./temp/out.png"), callBuffer);
            let fk = fork(utils.getPath("./../ocr/index.js"))
            fk.on("message", (d) => {
                resolve(d.arrs)
            })
        } catch (e) {
            console.log(e)
            resolve([])
        }


    })
}