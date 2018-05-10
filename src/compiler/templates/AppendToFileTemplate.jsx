import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    constructor(setup, content, file, options = {}) {
        super(setup, content)
        this.file = file
        this.options = {
            escapeContent: true,
            escapeFile: true,
            sudo: true,
            ...options
        }
    }

    compile = () => {
        const content = this.options.escapeContent ? shellEscape`${this.input}` : this.input
        const file = this.escapeFile ? shellEscape`${this.file}` : this.file
        const tool = this.options.sudo ? "sudo tee" : "tee"
        return `echo ${content} | ${tool} ${this.setup.format === "long" ? "--append" : "-a"} ${file}`
    }

}
