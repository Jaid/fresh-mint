import shellEscape from "../lib/shellEscape"
import download from "../lib/download"

import Template from "./Template"

export default class extends Template {

    compile = setup => {
        const file = `${this.input.directory}/${this.input.fileName}`
        const downloadScript = download.toFile(setup, this.input.url, file)
        if (setup.format === "long") {
            return downloadScript + shellEscape` && sudo apt deb ${file}`
        } else {
            return downloadScript + shellEscape` && sudo apt deb ${file}`
        }
    }

}
