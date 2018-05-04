import installs from "./installs.yml"

export default installs.map(install => {
    if (typeof install === "string") {
        install = {package: install}
    }

    if (install.ppa && !install.ppa.startsWith("ppa:")) {
        install.ppa = `ppa:${install.ppa}`
    }

    if (install.deb) {
        if (typeof install.deb == "string") {
            install.deb = {url: install.deb}
        }

        install.deb = {
            fileName: `${install.package}.deb`,
            directory: "/tmp",
            ...install.deb
        }
    }

    return {
        title: install.package,
        id: install.package,
        default: false,
        ...install
    }
})
