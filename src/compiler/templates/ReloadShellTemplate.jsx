import shells from "data/shells.yml"

import Template from "./Template"

export default class extends Template {

    compile = setup => {
        const currentShell = shells.find(shell => shell.name === setup.shell)
        const rcPath = currentShell?.rcPath || "~/.bashrc"
        return `. ${rcPath}`
    }

}
