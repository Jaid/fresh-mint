import React from "react"
import ReactDom from "react-dom"
import ReactGa from "react-ga"
import App from "components/App"
import "./theme.global.scss"

if (process.env.NODE_ENV === "production") {
    ReactGa.initialize("UA-51563406-5");
    ReactGa.pageview(window.location.pathname + window.location.search);
}

ReactDom.render(<App />, document.getElementById("react"))
