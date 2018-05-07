import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    compile =setup => {
        if (setup.format === "long") {
            return shellEscape`sudo apt add-repository --yes ${this.input.name}`
        } else {
            return shellEscape`sudo apt add-repository -y ${this.input.name}`
        }
    }

}
