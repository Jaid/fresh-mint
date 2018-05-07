import shellEscape from "../lib/shellEscape"

exports.toStream = (setup, url, handlerScript) => {
    if (setup.downloadTool === "curl") {
        if (setup.format !== "long") {
            return shellEscape`curl --silent --fail --location --retry 3 ${url} | ` + handlerScript
        } else {
            return shellEscape`curl -fsL --retry 3 ${url} | ` + handlerScript
        }
    } else {
        if (setup.format === "long") {
            return shellEscape`wget --tries 3 --quiet --output-document - ${url} | ` + handlerScript
        } else {
            return shellEscape`wget -t 3 -qO- ${url} | ` + handlerScript
        }
    }
}

exports.toFile = (setup, url, file) => {
    if (setup.downloadTool === "curl") {
        if (setup.format === "long") {
            return shellEscape`curl --fail --location --progress-bar --retry 3 --output ${file} ${url}`
        } else {
            return shellEscape`curl -fLo ${file} --retry 3 ${url}`
        }
    } else {
        if (setup.format === "long") {
            return shellEscape`wget --tries 3 --output-document ${file} ${url}`
        } else {
            return shellEscape`wget -t 3 -O ${file} ${url}`
        }
    }
}
