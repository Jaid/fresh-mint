import download from "../lib/download"
import Template from "./Template"

export default class extends Template {

    compile = setup => download.toStream(setup, this.input, `python3 - ${setup.format === "long" ? "---yes" : "-y"}`)

}
