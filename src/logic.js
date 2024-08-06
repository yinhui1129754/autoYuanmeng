import { utils } from "./utils";

export const msgType = {
    log: "log",
    error: "error",
    warn: "warn",
    success: "success",
}
export function print_log(msg, type) {
    ws.send(JSON.stringify({
        type: type || msgType.log,
        msg: msg || ""
    }));
}

export async function go_to_farm() {
    let nowTime = new Date().getTime();
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    print_log("等待3秒...", msgType.error)
    for (var i = 0; i < 1; i++) {
        await utils.sleep(1)
        print_log("等待3秒...", msgType.error)
    }
    await pyautogui.press("r")
    print_log("开始走到农场...")
    pyautogui.keyDown("a")
    pyautogui.keyDown("w")
    await sleep(4.8)
    pyautogui.keyUp("a")
    pyautogui.keyUp("w")

    pyautogui.keyDown("d")
    await sleep(0.8)
    pyautogui.keyUp("d")

    print_log("到达农场", msgType.success)
    return new Date().getTime() - nowTime;
}
export async function go_to_pasture() {
    let nowTime = new Date().getTime();
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    print_log("等待3秒...", msgType.error)
    for (var i = 0; i < 1; i++) {
        await utils.sleep(1)
        print_log("等待3秒...", msgType.error)
    }
    await pyautogui.press("r")
    print_log("开始走到牧场...")
    pyautogui.keyDown("w")
    await sleep(0.8)
    pyautogui.keyDown("d")
    await sleep(1.7)
    pyautogui.keyUp("w")
    pyautogui.keyUp("d")
    print_log("到达牧场", msgType.success)
    return new Date().getTime() - nowTime;
}

export async function go_to_fishpond() {

    let nowTime = new Date().getTime();
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    print_log("等待3秒...", msgType.error)
    for (var i = 0; i < 1; i++) {
        await utils.sleep(1)
        print_log("等待3秒...", msgType.error)
    }
    await pyautogui.press("r")
    print_log("开始走到鱼塘...")
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
    print_log("到达鱼塘", msgType.success)
    return new Date().getTime() - nowTime;
}

export async function find_drone() {
    let pyautogui = global.pc;
    let sleep = utils.sleep;
    print_log("寻找无人机")
    await pyautogui.press("r")
    // # print_nol("寻找无人机")
    pyautogui.keyDown("a")
    await sleep(1.2)
    pyautogui.keyUp("a")
}

export async function farm_work() {
    let pyautogui = global.pc;
    // let sleep = utils.sleep;
    await find_drone()
    print_log("无人机前往农场工作")
    await pyautogui.press("q")
}
export async function pasture_work() {
    let pyautogui = global.pc;
    // let sleep = utils.sleep;
    await find_drone()
    print_log("无人机前往牧场工作")
    await pyautogui.press("e")
}
export async function you_dang(n) {
    let endNum = n * 1000
    let nowTime = 0
    let sleep = utils.sleep;
    while (true) {
        let random = Math.random()
        if (random > 0.0 && random <= 0.2) {
            nowTime += await go_to_farm()
        } else if (random > 0.2 && random <= 0.4) {
            nowTime += await go_to_pasture()
        } else if (random > 0.4 && random <= 0.6) {
            nowTime += await go_to_fishpond()
        } else if (random > 0.6 && random <= 1) {
            nowTime += 3000
            print_log("等待时间")
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
        await farm_work()
        await you_dang(40)
        await pasture_work()
        await you_dang(25)
        let useTime = (new Date().getTime() - now)
        print_log("任务结束：运行时间" + (new Date().getTime() - now) + "毫秒", msgType.success)
        print_log("下次运行：" + (loopTime - useTime) + "毫秒", msgType.success)
        await you_dang((loopTime - useTime) / 1000)
    }
}