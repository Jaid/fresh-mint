import download from "../lib/download"
import Template from "./Template"
import AppendToFileTemplate from "./AppendToFileTemplate"

export default class extends Template {

    compile = () => {
        const teeCommand = new AppendToFileTemplate(this.setup, this.input.source, `${this.input.directory}/${this.input.fileName}`)
        if (this.input.keyUrl) {
            return `${download.toStream(this.setup, this.input.keyUrl, "sudo apt-key add -")} && ${teeCommand}`
        } else {
            return teeCommand
        }
    }

}
