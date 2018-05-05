import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {name: input}
        }

        super(input)
    }

    compile = setup => {
        if (setup.format === "long") {
            return shellEscape`sudo apt install --yes ${this.input.name}`
        } else {
            return shellEscape`sudo apt install -y ${this.input.name}`
        }
    }


}
