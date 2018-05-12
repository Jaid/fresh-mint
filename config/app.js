const fs = require("fs")
const packageData = JSON.parse(fs.readFileSync("package.json", "utf8"))

const title = "Fresh Mint"
const domain = `${packageData.name}.j4id.com`
const language = "en"
const locale = "en_US"
const twitterHandle = "jaidchen"

const siteUrl = `https://${domain}/`
const thumbnailSize = 228
const thumbnail = `${siteUrl}coast-228x228.png`
const description = packageData.description
const version = packageData.version
const authorName = packageData.author.name
const authorUrl = packageData.author.url
const googleAnalyticsTrackingId = null

module.exports = {
    title,
    version,
    language,
    locale,
    domain,
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
        title,
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
        title,
        authorProfileHandle: twitterHandle,
        businessProfileHandle: twitterHandle,
        image: thumbnail
    },
    googleFonts: [
        "Ubuntu:400,700&subset=latin-ext",
        "Source Code Pro:400,700&subset=latin-ext"
    ],
    googleAnalytics: { // https://analytics.google.com/analytics/web
        trackingId: googleAnalyticsTrackingId
    }
}
