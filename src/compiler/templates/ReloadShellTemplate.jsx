import shells from "data/shells.yml"

import Template from "./Template"

export default class extends Template {

    constructor(input) {
        if (typeof input === "string") {
            input = {url: input}
        }

        super(input)
    }

    compile = setup => {
        const currentShell = shells.find(shell => shell.name === setup.shell)
        const rcPath = currentShell?.rcPath || "~/.bashrc"
        return `. ${rcPath}`
    }

}
