import url from "url"
import shellEscape from "../lib/shell-escape-tag"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {url: input}
        }

        super({
            fileName: `${url.parse(input.url).hostname}.list`,
            ...input
        })
    }

    compileLong = () => {
        const sourcesFolder = "/etc/apt/sources.list.d"
        const file = `${sourcesFolder}/${this.input.fileName}`
        const fileContent = `deb [arch=amd64] ${this.input.url} stable main`
        return shellEscape`sudo sh -c "echo ${fileContent} >> ${file}"`
    }

    compileShort = () => {
        const sourcesFolder = "/etc/apt/sources.list.d"
        const file = `${sourcesFolder}/${this.input.fileName}`
        const fileContent = `deb [arch=amd64] ${this.input.url} stable main`
        return shellEscape`sudo sh -c "echo ${fileContent} >> ${file}"`
    }

}
