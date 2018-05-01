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
        } else {
            this.code.push(...code)
        }
    }

    toString = () => `# ${this.title}\n${this.code.join("\n")}`

}

export default class {

    constructor() {
        this.groups = {}
        this.header = "#!/usr/bin/env bash"
        this.addGroup("head")
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

    toString = () => Object.values(this.groups)
        .filter(group => group.code.length)
        .map(group => group.toString())
        .join("\n\n")

}
