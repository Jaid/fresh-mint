export default class {

    constructor(input) {
        this.input = input
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
        const command = this.compile(setup)
        if (comment) {
            return `${command} # ${comment}`
        } else {
            return command
        }
    }

}
