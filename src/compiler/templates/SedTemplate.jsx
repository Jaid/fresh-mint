import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    constructor(before, after, file, options) {
        super(before)
        this.after = after
        this.file = file
        this.options = {
            sudo: true,
            escapeFile: true,
            ...options
        }
    }

    compile = setup => {
        const file = this.escapeFile ? shellEscape`${this.file}` : this.file
        const pattern = `/${this.sedEscape(this.input)}/c\\${this.sedEscape(this.after)}`
        const tool = this.options.sudo ? "sudo sed" : "sed"
        return `${tool} ${shellEscape`${setup.format === "long" ? "--in-place" : "-i"} ${pattern}`} ${file}`
    }

    sedEscape = string => string.replace(/([&/\\])/g, "\\$1")

}
