import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    constructor(content, file, options = {}) {
        super(content)
        this.file = file
        this.options = {
            escapeContent: true,
            escapeFile: true,
            ...options
        }
    }

    compile = setup => {
        const content = this.options.escapeContent ? shellEscape`${this.input}` : this.input
        const file = this.escapeFile ? shellEscape`${this.file}` : this.file
        return `echo ${content} | sudo tee ${setup.format === "long" ? "--append" : "-a"} ${file}`
    }

}
