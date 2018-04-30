const fs = require("fs")
const packageData = JSON.parse(fs.readFileSync("package.json", "utf8"))

const title = "Wombathimmel"
const version = packageData.version
const embedTitle = title
const authorName = packageData.author.name
const authorUrl = "https://github.com/jaid"
const siteUrl = "https://github.com/jaid/fresh-mint"
const description = packageData.description
const thumbnail = `${siteUrl}/coast-228x228.png`
const thumbnailSize = 228
const language = "en"
const locale = "en_US"
const twitterHandle = "jaidchen"
const googleAnalyticsTrackingId = null

module.exports = {
    title,
    version,
    language,
    locale,
    siteUrl,
    authorName,
    authorUrl,
    description,
    id: packageData.name,
    appleMeta: { // https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
        statusBarStyle: "black",
        parsePhoneNumbers: false
    },
    openGraph: { // http://ogp.me/
        description,
        locale,
        title: embedTitle,
        url: siteUrl,
        image: thumbnail,
        imageWidth: thumbnailSize,
        imageHeight: thumbnailSize
    },
    openGraphFacebook: { // https://developers.facebook.com/docs/sharing/opengraph/object-properties
        updatedTime: Number(new Date)
    },
    twitterCard: { // https://dev.twitter.com/cards/markup
        description,
        title: embedTitle,
        authorProfileHandle: twitterHandle,
        businessProfileHandle: twitterHandle,
        image: thumbnail
    },
    googleFonts: [
        "Ubuntu:400,700&subset=latin-ext",
        "Roboto:400,700&subset=latin-ext",
        "Acme:400,700&subset=latin-ext"
    ],
    googleAnalytics: { // https://analytics.google.com/analytics/web
        trackingId: googleAnalyticsTrackingId
    }
}
