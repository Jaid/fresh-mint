import lodash from "lodash"
import BashScript from "./BashScript"
import DebTemplate from "./templates/DebTemplate"
import AptInstallTemplate from "./templates/AptInstallTemplate"
import AptAddKeyTemplate from "./templates/AptAddKeyTemplate"
import AptAddSourceTemplate from "./templates/AptAddSourceTemplate"
import PpaTemplate from "./templates/PpaTemplate"
import BashFromWebTemplate from "./templates/BashFromWebTemplate"
import PythonFromWebTemplate from "./templates/PythonFromWebTemplate"
import ReloadShellTemplate from "./templates/ReloadShellTemplate"

const setup = {
    commands: [],
    aptUpgrade: true,
    disablePasswordPrompt: true,
    packages: [
        "steam",
        "build-essential",
        "zsh",
        {
            name: "atom",
            ppa: "ppa:webupd8team/atom"
        }
    ],
    ppas: [],
    debs: [
        {
            url: "https://discordapp.com/api/download?platform=linux&format=deb",
            fileName: "discord.deb"
        }
    ],
    aptKeys: [],
    aptSources: [
        {
            url: "http://dl.google.com/linux/chrome/deb/",
            fileName: "google-chrome.list"
        }
    ],
    npmClient: "yarn",
    shell: "zsh",
    pythonWebScripts: [],
    format: "short"
}

const script = new BashScript()

for (const command of setup.commands) {
    if (typeof command === "string") {
        script.add(command)
    } else {
        script.add(command.code, command.group)
    }
}

for (const pkg of setup.packages) {
    if (pkg.ppa && !setup.ppas.includes(pkg.ppa)) {
        setup.ppas.push(pkg.ppa)
    }

    script.addCode(new AptInstallTemplate(pkg).compile(setup), "apt-install")
}

for (const deb of setup.debs) {
    script.addCode(new DebTemplate(deb).compile(setup), "dpkg-install")
}

if (!lodash.isEmpty(setup.ppas)) {
    for (const ppa of setup.ppas) {
        script.addCode(new PpaTemplate(ppa).compile(setup), "add-ppas")
    }

    script.addCode(new PythonFromWebTemplate("https://raw.githubusercontent.com/davidfoerster/apt-remove-duplicate-source-entries/master/apt-remove-duplicate-source-entries.py").compile(setup), "clean-up")
    script.addCode("sudo apt update")
}

if (!lodash.isEmpty(setup.aptSources)) {
    script.addCode(new AptAddKeyTemplate("https://dl-ssl.google.com/linux/linux_signing_key.pub").compile(setup))
    for (const aptSource of setup.aptSources) {
        script.addCode(new AptAddSourceTemplate(aptSource).compile(setup))
    }
}

if (setup.aptUpgrade) {
    script.addCode(new PythonFromWebTemplate("https://raw.githubusercontent.com/davidfoerster/apt-remove-duplicate-source-entries/master/apt-remove-duplicate-source-entries.py").compile(setup))
}

if (setup.disablePasswordPrompt) {
    script.addCode("sudo sh -c \"echo '${USER} ALL=NOPASSWD: ALL' > /etc/sudoers.d/${USER}\"")
}

if (setup.npmClient) {
    const code = []
    code.push(new BashFromWebTemplate("https://raw.githubusercontent.com/creationix/nvm/master/install.sh").compile(setup))
    code.push(". ~/.bashrc")
    code.push("nvm install node && nvm install latest npm")
    code.push(new BashFromWebTemplate("https://yarnpkg.com/install.sh").compile(setup))
    script.addCode(code, "install-npm")
    code.push(". ~/.bashrc")
}

console.log(script.toString())
