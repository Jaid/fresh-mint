import React from "react"
import ReactDom from "react-dom"
import App from "components/App"
import "!style-loader!css-loader!sass-loader!./theme.scss"

ReactDom.render(<App />, document.getElementById("react"))
