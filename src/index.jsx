import React from "react"
import ReactDom from "react-dom"
import App from "components/App"
import "./theme.global.scss"

if (process.env.NODE_ENV === "production" && process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
    const googleAnalytics = require("react-ga")
    googleAnalytics.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID);
    googleAnalytics.pageview(window.location.pathname + window.location.search);
}

ReactDom.render(<App/>, document.getElementById(process.env.CRYPT_ID))
