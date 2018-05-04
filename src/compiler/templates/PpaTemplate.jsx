import shellEscape from "../lib/shell-escape-tag"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {name: input}
        }

        super(input)
    }

    compile =setup => {
        if (setup.format === "long") {
            return shellEscape`sudo apt add-repository --yes ${this.input.name}`
        } else {
            return shellEscape`sudo apt add-repository -y ${this.input.name}`
        }
    }

}
