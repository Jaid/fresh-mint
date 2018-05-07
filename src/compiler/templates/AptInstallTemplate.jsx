import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    compile = setup => {
        if (setup.format === "long") {
            return shellEscape`sudo apt install --yes ${this.input.package}`
        } else {
            return shellEscape`sudo apt install -y ${this.input.package}`
        }
    }


}
