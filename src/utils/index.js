import _ from "lodash"
import fs from "fs"
import path from "path"
export const utils = {
    merge: _.merge,
    trim: _.trim,
    readConfig(path) {
        let j = fs.readFileSync(path, 'utf-8')
        return JSON.parse(j)
    },
    getPath(p) {
        return path.join(__dirname, p)
    },
    async sleep(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time * 1000)
        })
    }
}