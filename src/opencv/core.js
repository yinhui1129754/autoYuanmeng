import cv from "@techstark/opencv-js"
import fs from "fs"
import { PNG } from "pngjs"
export class OpenCvCore {
    constructor() {

    }
    async readMat(buffer) {
        return new Promise((resolve, reject) => {
            let img = new PNG({ filterType: 4 }).parse(buffer, function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(cv.matFromImageData(img));
                }
            });
        })
        // let img2 = new PNG({ filterType: 4 }).parse(img, function (error, data) {
        //     console.log(error, data);
        //     console.log(img2)
        //     let useImg = cv.matFromImageData(img2)
        //     // console.log(img2.data.length)
        // });
    }
    async readMatFromFile(path) {
        let buf = fs.readFileSync(path)
        return this.readMat(buf)
    }
    async readBufferFromFile(path) {
        let buf = fs.readFileSync(path)
        return buf;
    }
    async findImgRect(srcImg, templImg) {
        let src = await this.readMat(srcImg)
        let templ = await this.readMat(templImg)
        let dst = new cv.Mat();
        let mask = new cv.Mat();
        let c = cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF, mask);
        let result = cv.minMaxLoc(dst, mask);
        let maxPoint = result.maxLoc;
        // let color = new cv.Scalar(255, 0, 0, 255);
        // let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
        return {
            x: maxPoint.x,
            y: maxPoint.y,
            width: templ.cols,
            height: templ.rows
        }
    }
}

// let src = cv.imread('imageCanvasInput');
// let templ = cv.imread('templateCanvasInput');
// let dst = new cv.Mat();
// let mask = new cv.Mat();
// cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF, mask);
// let result = cv.minMaxLoc(dst, mask);
// let maxPoint = result.maxLoc;
// let color = new cv.Scalar(255, 0, 0, 255);
// let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
// cv.rectangle(src, maxPoint, point, color, 2, cv.LINE_8, 0);
// cv.imshow('canvasOutput', src);
// src.delete();
// dst.delete();
// mask.delete();
