const { execFile } = require('child_process');
const path = require('path');

// 配置 ADB 路径（雷电模拟器自带的 ADB 路径）
const ADB_PATH = 'F:\\install\\leidian\\LDPlayer9\\adb.exe';

/**
 * 执行 ADB 命令的通用函数
 * @param {string[]} args - ADB 命令参数（如 ['connect', '127.0.0.1:5555']）
 * @returns {Promise<string>} 执行结果
 */
function runAdb(args) {
    return new Promise((resolve, reject) => {
        execFile(ADB_PATH, args, (error, stdout, stderr) => {
            if (error) {
                reject(`ADB 执行失败：${error.message}`);
                return;
            }
            if (stderr && !stderr.includes('already connected')) { // 忽略"已连接"的警告
                reject(`ADB 错误：${stderr}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

// 示例：连接雷电模拟器 + 输入文本
async function main() {
    // 1. 连接多开模拟器（端口 5555）
    await runAdb(['connect', '127.0.0.1:5555']);

    // 2. 向模拟器输入文本
    // await runAdb([
    //     '-s', '127.0.0.1:5555',
    //     'shell', 'input', 'text', "'Node.js ADB 测试'"
    // ]);

    // 3. 模拟点击屏幕（x=500, y=800）
    await runAdb([
        '-s', '127.0.0.1:5555',
        'shell', 'input', 'tap', '500', '800'
    ]);

    console.log('操作执行完成！');
}

main().catch(err => console.error('执行失败：', err));