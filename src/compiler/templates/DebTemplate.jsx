import shellEscape from "shell-escape-tag"
import url from "url"

import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {url: input}
        }

        input = {
            fileName: `${url.parse(input.url).hostname}.deb`,
            directory: "/tmp",
            ...input
        }

        super(input)
    }

    compileLong = () => {
        const file = `${this.input.directory}/${this.input.fileName}`
        return shellEscape`wget --output-document ${file} ${this.input.url} && sudo dpkg --install ${file}`
    }

    compileShort = () => {
        const file = `${this.input.directory}/${this.input.fileName}`
        return shellEscape`wget -O ${file} ${this.input.url} && sudo dpkg -i ${file}`
    }

}
