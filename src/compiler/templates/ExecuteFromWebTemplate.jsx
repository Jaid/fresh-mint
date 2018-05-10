import download from "../lib/download"
import Template from "./Template"

export default class extends Template {

    constructor(setup, input, tool) {
        super(setup, input)
        this.tool = tool
    }

    compile = () => download.toStream(this.setup, this.input, this.tool)

}
