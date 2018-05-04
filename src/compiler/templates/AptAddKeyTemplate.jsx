import download from "../lib/download"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {url: input}
        }

        super(input)
    }

    compile = setup => download.toStream(setup, this.input.url, "sudo apt-key add -")

}
