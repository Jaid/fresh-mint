import downloadToContext from "../lib/downloadToContext"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {url: input}
        }

        super(input)
    }

    compileLong = () => downloadToContext.long(this.input.url, "sudo apt-key add -")

    compileShort = () => downloadToContext.short(this.input.url, "sudo apt-key add -")

}
