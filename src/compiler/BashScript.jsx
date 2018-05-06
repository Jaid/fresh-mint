import lodash from "lodash"
import minifyBash from "bash-minifier"

class CodeGroup {

    constructor(id, options = {}) {
        this.code = []
        this.title = options.title || id

        if (options.code) {
            this.addCode(options.code)
        }
    }

    addCode = code => {
        if (typeof code === "string") {
            this.code.push(code)
        } else if (lodash.isArray(code)) {
            this.code.push(...code)
        }
    }

    toString = () => `# ${this.title}\n${this.code.join("\n")}`

}

export default class {

    constructor(groups = null) {
        this.groups = {}
        this.header = "#!/usr/bin/env bash"
        this.addGroup("head")

        if (typeof groups === "object") {
            for (const [id, options] of Object.entries(groups)) {
                this.addGroup(id, options)
            }
        }
    }

    addGroup = (id, options) => {
        this.groups[id] = new CodeGroup(id, options)
    }

    addCode = (code, groupId = "head") => {
        if (!this.groups[groupId]) {
            this.groups[groupId] = new CodeGroup(groupId, {code})
        } else {
            this.groups[groupId].addCode(code)
        }
    }

    toString = (minify = false) => {
        let script = Object.values(this.groups)
            .filter(group => group.code.length)
            .map(group => group.toString())
            .join("\n\n")

        if (minify) {
            return `${this.header}\n${minifyBash(script)}`
        } else {
            return `${this.header}\n\n${script}`
        }
    }

}
