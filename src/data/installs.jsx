import installs from "./installs.yml"

export default installs.map(install => {
    if (typeof install === "string") {
        install = {package: install}
    }

    return {
        title: install.package,
        id: install.package,
        default: false,
        ...install
    }
})
