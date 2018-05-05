import download from "../lib/download"
import shellEscape from "../lib/shellEscape"
import Template from "./Template"

export default class extends Template {

    compile = setup => {
        const file = `${this.input.directory}/${this.input.fileName}`
        if (setup.format === "long") {
            return this.compileKey(setup) + shellEscape`echo ${this.input.source} | sudo tee --append ${file}`
            // return shellEscape`sudo sh -c "echo ${fileContent} >> ${file}"` // http://heirloom.sourceforge.net/sh/sh.1.html Where is the long form of -c?
        } else {
            return this.compileKey(setup) + shellEscape`echo ${this.input.source} | sudo tee -a ${file}`
            // return shellEscape`sudo sh -c "echo ${fileContent} >> ${file}"`
        }
    }

    compileKey = setup => {
        if (!this.input.keyUrl) {
            return ""
        }

        return `${download.toStream(setup, this.input.keyUrl, "sudo apt-key add -")} && `
    }

}
