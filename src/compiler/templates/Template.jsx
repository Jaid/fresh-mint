import shellEscape from "../lib/shellEscape"

export default class {

    constructor(input) {
        this.input = input
    }

    if = condition => {
        this.before = `[ ${condition} ] && `
    }

    ifNot = condition => {
        this.before = `[ ${condition} ] || `
    }

    ifFileExists = (file, options = {}) => {
        options = {
            escapeFile: true,
            ...options
        }
        this.if(`-f ${options.escapeFile ? shellEscape`${file}` : file}`)
        return this
    }

    ifFileNotExists = (file, options = {}) => {
        options = {
            escapeFile: true,
            ...options
        }
        this.ifNot(`-f ${options.escapeFile ? shellEscape`${file}` : file}`)
        return this
    }

    getCompilerByFormat = (format = "long") => {
        if (format === "long") {
            return this.compileLong
        }

        if (format === "short") {
            return this.compileShort
        }

        return this.compileLong
    }

    toString = (setup, comment) => {
        let command = this.compile(setup)
        if (this.before) {
            command = `${this.before} ${command}`
        }

        if (this.after) {
            command = `${command} ${this.after}`
        }

        if (comment) {
            command = `${command} # ${comment}`
        }

        return command
    }

}
