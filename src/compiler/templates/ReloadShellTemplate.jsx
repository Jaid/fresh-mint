import shells from "data/shells.yml"

import Template from "./Template"

export default class extends Template {

    compile = () => {
        const currentShell = shells.find(shell => shell.name === this.setup.shell)
        const rcPath = currentShell?.rcPath || "~/.bashrc"
        return `. ${rcPath}`
    }

}
