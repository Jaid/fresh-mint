import lodash from "lodash"
import BashScript from "./BashScript"
import DebTemplate from "./templates/DebTemplate"
import AptInstallTemplate from "./templates/AptInstallTemplate"
import AptAddSourceTemplate from "./templates/AptAddSourceTemplate"
import PpaTemplate from "./templates/PpaTemplate"
import ExecuteFromWebTemplate from "./templates/ExecuteFromWebTemplate"
import ReloadShellTemplate from "./templates/ReloadShellTemplate"
import installs from "data/installs"
import and from "and"

export default setup => {
    console.log({
        setup,
        installs
    })

    try {
        if (lodash.isEmpty(setup)) {
            return ""
        }

        /*
         * setup = {
         * commands: [],
         * aptUpgrade: true,
         * disablePasswordPrompt: true,
         * packages: [
         * "steam",
         * "build-essential",
         * "zsh",
         * {
         * name: "atom",
         * ppa: "ppa:webupd8team/atom"
         * }
         * ],
         * ppas: [],
         * debs: [
         * {
         * url: "https://discordapp.com/api/download?platform=linux&format=deb",
         * fileName: "discord.deb"
         * }
         * ],
         * aptKeys: [],
         * aptSources: [
         * {
         * url: "http://dl.google.com/linux/chrome/deb/",
         * fileName: "google-chrome.list"
         * }
         * ],
         * npmClient: "yarn",
         * shell: "zsh",
         * pythonWebScripts: [],
         * format: "short"
         * }
         */

        const script = new BashScript({
            addSources: {title: "Configure additional software sources"},
            addPpas: {title: "Register additional PPAs"},
            aptInstall: {title: "Install apt packages"},
            debInstall: {title: "Install Debian packages from web sources"},
            clean: {title: "Clean up"}
        })

        const checkedInstalls = installs.filter(install => setup.installs.includes(install.id))

        if (!lodash.isEmpty(checkedInstalls)) {
            script.addCode("sudo apt clean", "clean")
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
                    script.addCode(new DebTemplate(install.deb).toString(setup), "debInstall")
                } else {
                    script.addCode(new AptInstallTemplate(install.package).toString(setup), "aptInstall")
                }
            }

            for (const [ppa, usingInstalls] of Object.entries(ppas)) {
                const list = and(lodash.sortBy(usingInstalls.map(usingInstall => usingInstall.title)), "and")
                script.addCode(new PpaTemplate(ppa).toString(setup, `PPA used for ${list}`), "addPpas")
            }

            for (const usingInstalls of Object.values(sourceLists)) {
                const list = and(lodash.sortBy(usingInstalls.map(usingInstall => usingInstall.title)), "and")
                script.addCode(new AptAddSourceTemplate(usingInstalls[0].list).toString(setup, `Source list used for ${list}`), "addSources")
            }

            if (checkedInstalls.find(install => install.list)) {
                script.addCode(new ExecuteFromWebTemplate("https://raw.githubusercontent.com/davidfoerster/apt-remove-duplicate-source-entries/master/apt-remove-duplicate-source-entries.py", `sudo python3 - ${setup.format === "long" ? "--yes" : "-y"}`).toString(setup, "Remove duplicate entries from source lists"), "clean")
            }
        }

        /*
         * for (const command of setup.commands) {
         * if (typeof command === "string") {
         * script.add(command)
         * } else {
         * script.add(command.code, command.group)
         * }
         * }
         *
         * for (const pkg of setup.packages) {
         * if (pkg.ppa && !setup.ppas.includes(pkg.ppa)) {
         * setup.ppas.push(pkg.ppa)
         * }
         *
         * script.addCode(new AptInstallTemplate(pkg).compile(setup), "apt-install")
         * }
         *
         * for (const deb of setup.debs) {
         * script.addCode(new DebTemplate(deb).compile(setup), "dpkg-install")
         * }
         *
         * if (!lodash.isEmpty(setup.ppas)) {
         * for (const ppa of setup.ppas) {
         * script.addCode(new PpaTemplate(ppa).compile(setup), "add-ppas")
         * }
         *
         * script.addCode(new PythonFromWebTemplate("https://raw.githubusercontent.com/davidfoerster/apt-remove-duplicate-source-entries/master/apt-remove-duplicate-source-entries.py").compile(setup), "clean-up")
         * script.addCode("sudo apt update")
         * }
         *
         * if (!lodash.isEmpty(setup.aptSources)) {
         * script.addCode(new AptAddKeyTemplate("https://dl-ssl.google.com/linux/linux_signing_key.pub").compile(setup))
         * for (const aptSource of setup.aptSources) {
         * script.addCode(new AptAddSourceTemplate(aptSource).compile(setup))
         * }
         * }
         *f
         * if (setup.aptUpgrade) {
         * script.addCode(new PythonFromWebTemplate("https://raw.githubusercontent.com/davidfoerster/apt-remove-duplicate-source-entries/master/apt-remove-duplicate-source-entries.py").compile(setup))
         * }
         *
         * if (setup.disablePasswordPrompt) {
         * script.addCode("sudo sh -c \"echo '${USER} ALL=NOPASSWD: ALL' > /etc/sudoers.d/${USER}\"")
         * }
         *
         * if (setup.npmClient) {
         * const code = []
         * code.push(new BashFromWebTemplate("https://raw.githubusercontent.com/creationix/nvm/master/install.sh").compile(setup))
         * code.push(". ~/.bashrc")
         * code.push("nvm install node && nvm install latest npm")
         * code.push(new BashFromWebTemplate("https://yarnpkg.com/install.sh").compile(setup))
         * script.addCode(code, "install-npm")
         * code.push(". ~/.bashrc")
         * }
         */
        return script.toString(setup.format === "minified")
    } catch (e) {
        console.error(e)
        return `# Bash script compilation failed!\n# ${e}`
    }
}
