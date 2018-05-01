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

    compile = setup => this.getCompilerByFormat(setup?.format)(setup)

}
