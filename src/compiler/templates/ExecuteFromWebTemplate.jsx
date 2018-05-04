import download from "../lib/download"
import Template from "./Template"

export default class extends Template {

    constructor(input, tool) {
        super(input)
        this.tool = tool
    }

    compile = setup => download.toStream(setup, this.input, this.tool)

}
