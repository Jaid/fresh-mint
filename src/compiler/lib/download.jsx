import shellEscape from "../lib/shellEscape"

exports.toStream = (setup, url, handlerScript) => {
    if (setup.format === "long") {
        return shellEscape`wget --quiet --output-document - ${url} | ` + handlerScript
    } else {
        return shellEscape`wget -qO- ${url} | ` + handlerScript
    }
}

exports.toFile = (setup, url, file) => {
    if (setup.format === "long") {
        return shellEscape`wget --output-document ${file} ${url}`
    } else {
        return shellEscape`wget -O ${file} ${url}`
    }
}
