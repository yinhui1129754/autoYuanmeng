const { createWorker } = require('tesseract.js');
const path = require('path');
const PNG = require('pngjs').PNG;
const fs = require('fs');

async function readPng(buffer, call) {
    let img = await PNG.sync.read(buffer, { filterType: 4 });
    for (var y = 0; y < img.height; y++) {
        for (var x = 0; x < img.width; x++) {
            var idx = (img.width * y + x) << 2;
            var pj = img.data[idx] + img.data[idx + 1] + img.data[idx + 2]
            let pj2 = img.data[idx] * 0.333 + img.data[idx + 1] * 0.333 + img.data[idx + 2] * 0.333;

            // invert color
            img.data[idx] = parseInt(pj2);
            img.data[idx + 1] = parseInt(pj2);
            img.data[idx + 2] = parseInt(pj2);
        }
    }

    let callBuffer = await PNG.sync.write(img);
    call && call(callBuffer)
    // fs.writeFileSync('out.png', callBuffer);
    return callBuffer
}
(async function () {
    console.log(__dirname)
    let buf = fs.readFileSync(path.join(__dirname, "../dist/temp/out.png"));
    readPng(buf, async (buf2) => {
        const worker = await createWorker(["chi_sim", "eng"], undefined, {
            langPath: "./ocr/lang",
            corePath: "./ocr/core",
        });
        const info = await worker.recognize(buf2, "chi_sim+eng");
        const infos = info.data.text.split("\n");
        await worker.terminate();
        process.send({ arrs: infos })
    })

})();