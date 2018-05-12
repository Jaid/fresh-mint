const fs = require("fs")
const packageData = JSON.parse(fs.readFileSync("package.json", "utf8"))

const title = "Fresh Mint"
const language = "en"
const locale = "en_US"
const twitterHandle = "jaidchen"
const googleAnalyticsTrackingId = null

const domain = `${packageData.name}.j4id.com`
const siteUrl = `https://${domain}/`

module.exports = {
    title,
    language,
    locale,
    domain,
    image: `${siteUrl}coast-228x228.png`,
    imageWidth: 228,
    imageHeight: 228,
    id: packageData.name,
    version: packageData.version,
    authorName: packageData.author.name,
    authorUrl: packageData.author.url,
    description: packageData.description,
    noScriptMessage: "Would... would you mind giving me permission to execute one of my best scripts for you, senpai?\nwww.enable-javascript.com",
    appleMeta: { // https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
        statusBarStyle: "black",
        parsePhoneNumbers: false
    },
    openGraph: { // http://ogp.me/
        url: siteUrl
    },
    openGraphFacebook: true,
    twitterCard: { // https://dev.twitter.com/cards/markup
        handle: twitterHandle
    },
    googleFonts: [
        "Ubuntu:400,700&subset=latin-ext",
        "Source Code Pro:400,700&subset=latin-ext"
    ],
    googleAnalytics: { // https://analytics.google.com/analytics/web
        trackingId: googleAnalyticsTrackingId
    }
}
