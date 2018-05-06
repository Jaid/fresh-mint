import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    constructor(content, file, options = {}) {
        super(content)
        this.file = file
        this.options = {
            escapeContent: true,
            escapeFile: true,
            sudo: true,
            ...options
        }
    }

    compile = setup => {
        const content = this.options.escapeContent ? shellEscape`${this.input}` : this.input
        const file = this.escapeFile ? shellEscape`${this.file}` : this.file
        const tool = this.options.sudo ? "sudo tee" : "tee"
        return `echo ${content} | ${tool} ${setup.format === "long" ? "--append" : "-a"} ${file}`
    }

}
