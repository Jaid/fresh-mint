import installs from "./installs.yml"

export default installs.map(install => {
    if (typeof install === "string") {
        install = {package: install}
    }

    install = {
        id: install.package,
        title: install.package,
        ...install
    }

    if (install.ppa && !install.ppa.startsWith("ppa:")) {
        install.ppa = `ppa:${install.ppa}`
    }

    if (install.deb) {
        if (typeof install.deb == "string") {
            install.deb = {url: install.deb}
        }

        install.deb = {
            fileName: `${install.id}.deb`,
            directory: "/tmp",
            ...install.deb
        }
    }

    if (install.list) {
        if (typeof install.list === "string") {
            install.list = {downloadUrl: install.list}
        }

        install.list = {
            fileName: `${install.id}.list`,
            source: `deb ${install.list.downloadUrl} stable main`,
            directory: "/etc/apt/sources.list.d",
            ...install.list
        }
    }

    return install
})
