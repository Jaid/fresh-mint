import shellEscape from "../lib/shellEscape"

export default class {

    constructor(setup, input) {
        this.setup = setup
        this.input = input
        this.processors = []
    }

    if = condition => {
        this.processors.push(code => `if [ ${condition} ]; then ${code}; fi`)
        return this
    }

    ifNot = condition => this.if(`! ${condition}`)

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

    comment = comment => {
        this.processors.push(code => `${code} # ${comment}`)
        return this
    }

    toString = () => {
        let command = this.compile(this.setup)

        for (const processor of this.processors) {
            command = processor(command)
        }

        return command
    }

}
