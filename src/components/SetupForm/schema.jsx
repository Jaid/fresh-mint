import installs from "data/installs"
import removals from "data/removals"
import lodash from "lodash"

const orderedInstalls = lodash.orderBy(installs, ["default", install => install.title.toLowerCase()], ["desc", "asc"])

const schema = {
    title: "Setup",
    type: "object",
    properties: {
        installPackages: {
            type: "object",
            properties: {}
        }
    }
}

const ui = {installPackages: {}}

for (let install of orderedInstalls) {
    schema.properties.installPackages.properties[install.package] = {
        type: "boolean",
        title: install.title,
        default: install.default
    }

    ui.installPackages[install.package] = {
        "ui:widget": "install",
        "ui:options": {label: false}
    }
}

export default {
    schema,
    ui
}
