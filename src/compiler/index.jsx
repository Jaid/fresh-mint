import lodash from "lodash"
import BashScript from "./BashScript"
import DebTemplate from "./templates/DebTemplate"
import AptInstallTemplate from "./templates/AptInstallTemplate"
import AptRemoveTemplate from "./templates/AptRemoveTemplate"
import AptAddSourceTemplate from "./templates/AptAddSourceTemplate"
import PpaTemplate from "./templates/PpaTemplate"
import ExecuteFromWebTemplate from "./templates/ExecuteFromWebTemplate"
import EditConfigTemplate from "./templates/EditConfigTemplate"
import ReloadShellTemplate from "./templates/ReloadShellTemplate"
import AppendToFileTemplate from "./templates/AppendToFileTemplate"
import installs from "data/installs"
import removals from "data/removals"
import and from "and"

export default setup => {
    try {
        if (lodash.isEmpty(setup)) {
            return ""
        }

        const script = new BashScript({
            sysConfig: {title: "Edit system configuration"},
            disablePasswordPrompt: {title: "Disable password prompt for sudo"},
            aptUpdate: {
                title: "Update caches",
                code: ["sudo apt update"]
            },
            aptRemove: {title: "Remove unneeded preinstalled packages"},
            aptUpgrade: {title: "Upgrade preinstalled packages"},
            addSources: {title: "Configure additional software sources"},
            addPpas: {title: "Register additional PPAs"},
            aptInstall: {title: "Install apt packages"},
            debInstall: {title: "Install Debian packages from web sources"},
            clean: {title: "Clean up"}
        })

        const checkedInstalls = installs.filter(install => setup.installs.includes(install.id))
        const checkedRemovals = removals.filter(removal => setup.removals.includes(removal.id))

        for (const removal of checkedRemovals) {
            script.addCode(new AptRemoveTemplate(setup, removal).toString(setup), "aptRemove")
        }

        if (!lodash.isEmpty(checkedInstalls)) {
            const ppas = {}
            const sourceLists = {}

            for (const install of checkedInstalls) {
                if (install.ppa) {
                    const id = install.ppa
                    if (ppas[id]) {
                        ppas[id].push(install)
                    } else {
                        ppas[id] = [install]
                    }
                }

                if (install.list) {
                    const id = install.list.downloadUrl
                    if (sourceLists[id]) {
                        sourceLists[id].push(install)
                    } else {
                        sourceLists[id] = [install]
                    }
                }

                if (install.deb) {
                    script.addCode(new DebTemplate(setup, install.deb), "debInstall")
                } else {
                    script.addCode(new AptInstallTemplate(setup, install), "aptInstall")
                }
            }

            for (const [ppa, usingInstalls] of Object.entries(ppas)) {
                const list = and(lodash.sortBy(usingInstalls.map(usingInstall => usingInstall.title)), "and")
                script.addCode(new PpaTemplate(setup, ppa).comment(`PPA used for ${list}`), "addPpas")
            }

            for (const usingInstalls of Object.values(sourceLists)) {
                const list = and(lodash.sortBy(usingInstalls.map(usingInstall => usingInstall.title)), "and")
                script.addCode(new AptAddSourceTemplate(setup, usingInstalls[0].list).comment(`Source list used for ${list}`), "addSources")
            }

            if (checkedInstalls.find(install => install.list)) { // Only run if at least 1 installed package adds a source list
                script.addCode(new ExecuteFromWebTemplate(setup, "https://raw.githubusercontent.com/davidfoerster/apt-remove-duplicate-source-entries/master/apt-remove-duplicate-source-entries.py", `sudo python3 - ${setup.format === "long" ? "--yes" : "-y"}`).comment("Remove duplicate entries from source lists"), "clean")
            }

            if (checkedInstalls.find(install => !install.deb)) { // Only run if at least 1 non-deb package is installed
                script.addCode("sudo apt clean", "clean")
            }
        }

        if (setup.aptUpgrade) {
            script.addCode(`sudo apt full-upgrade ${setup.format === "long" ? "--yes" : "-y"}`, "aptUpgrade")
        }

        if (setup.disablePasswordPrompt) {
            const sudoersFile = "/etc/sudoers.d/$USER"
            script.addCode(new AppendToFileTemplate(setup, "\"$USER ALL=NOPASSWD: ALL\"", sudoersFile, {
                escapeFile: false,
                escapeContent: false
            }).ifFileNotExists(sudoersFile, {escapeFile: false}), "disablePasswordPrompt")
        }

        if (setup.swappiness !== "skip") {
            script.addCode(new EditConfigTemplate(setup, "vm.swappiness", setup.swappiness, "/etc/sysctl.conf", {sudo: true}), "sysConfig")
        }

        return script.toString(setup.format === "minified")
    } catch (e) {
        console.error(e)
        return `# Bash script compilation failed!\n# ${e}`
    }
}
