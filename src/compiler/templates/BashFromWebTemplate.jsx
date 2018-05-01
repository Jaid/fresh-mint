import downloadToContext from "../lib/downloadToContext"
import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {url: input}
        }

        super(input)
    }

    compileLong = setup => downloadToContext.long(this.input.url, setup.shell || "bash")

    compileShort = setup => downloadToContext.short(this.input.url, setup.shell || "bash")

}
