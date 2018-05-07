import shellEscape from "../lib/shellEscape"
import AppendToFileTemplate from "./AppendToFileTemplate"
import SedTemplate from "./SedTemplate"
import Template from "./Template"

export default class extends Template {

    constructor(property, value, file, options = {}) {
        super(property)
        this.value = value
        this.file = file
        this.options = {
            sudo: true,
            escapeFile: true,
            ...options
        }
    }

    compile = setup => {
        const file = this.escapeFile ? shellEscape`${this.file}` : this.file
        const ifCommand = `if egrep ${setup.format === "long" ? "--quiet" : "-q"} '^ *${this.input} *= *' ${file}`
        const ansiRed = setup.colors ? "\\033[1;31m" : ""
        const ansiGreen = setup.colors ? "\\033[1;32m" : ""

        const appendCommand = new AppendToFileTemplate(`\\n${this.input}=${this.value}`, file, {escapeFile: false}).toString(setup)
        const appendMessage = shellEscape`${`${ansiGreen}Added property ${ansiRed}${this.input}${ansiGreen} to ${this.file}`}`

        const editCommand = new SedTemplate(`^ *${this.input} *= *`, `${this.input}=${this.value}`, this.file, {escapeFile: false}).toString(setup)
        const editMessage = shellEscape`${`${ansiGreen}Edited property ${ansiRed}${this.input}${ansiGreen} in ${this.file}`}`

        return `${ifCommand}; then ${editCommand} && echo ${editMessage}; else ${appendCommand} && echo ${appendMessage}; fi`
    }

}