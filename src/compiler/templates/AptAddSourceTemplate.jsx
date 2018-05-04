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

    compile = setup => {
        const sourcesFolder = "/etc/apt/sources.list.d"
        const file = `${sourcesFolder}/${this.input.fileName}`
        const fileContent = `deb [arch=amd64] ${this.input.url} stable main`

        if (setup.format === "long") {
            return shellEscape`sudo sh -c "echo ${fileContent} >> ${file}"` // http://heirloom.sourceforge.net/sh/sh.1.html Where is the long form of -c?
        } else {
            return shellEscape`sudo sh -c "echo ${fileContent} >> ${file}"`
        }
    }

}
