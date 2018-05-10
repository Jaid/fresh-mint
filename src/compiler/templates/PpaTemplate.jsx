import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    compile = () => {
        if (this.setup.format === "long") {
            return shellEscape`sudo apt add-repository --yes ${this.input}`
        } else {
            return shellEscape`sudo apt add-repository -y ${this.input}`
        }
    }

}
