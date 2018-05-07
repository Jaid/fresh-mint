import removals from "./removals.yml"

export default removals.map(removal => {
    if (typeof removal === "string") {
        removal = {package: removal}
    }

    removal = {
        id: removal.package,
        title: removal.package,
        ...removal
    }

    return removal
})
