import download from "../lib/download"
import Template from "./Template"
import AppendToFileTemplate from "./AppendToFileTemplate"

export default class extends Template {

    compile = setup => {
        const teeCommand = new AppendToFileTemplate(this.input.source, `${this.input.directory}/${this.input.fileName}`).toString(setup)
        if (this.input.keyUrl) {
            return `${download.toStream(setup, this.input.keyUrl, "sudo apt-key add -")} && ${teeCommand}`
        } else {
            return teeCommand
        }
    }

}
