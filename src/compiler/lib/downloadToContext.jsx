import shellEscape from "shell-escape-tag"

exports.long = (url, handlerScript) => shellEscape`wget --quiet --output-document - ${url} | ` + handlerScript

exports.short = (url, handlerScript) => shellEscape`wget -qO- ${url} | ` + handlerScript
