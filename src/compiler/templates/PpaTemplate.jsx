import shellEscape from "shell-escape-tag"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {name: input}
        }

        super(input)
    }

    compileLong = () => shellEscape`sudo apt add-repository --yes ${this.input.name}`

    compileShort = () => shellEscape`sudo apt add-repository --y ${this.input.name}`

}
