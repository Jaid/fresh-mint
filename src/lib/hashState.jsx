import msgpack from "msgpack5"
import baseX from "base-x"
import pako from "pako"

const safeChars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz!$&'()*+,;=-._~:@/?"
const serializer = msgpack()
const base77 = baseX(safeChars)

/*
 * Can't use compressjs
 * https://github.com/cscott/compressjs/issues/19
 */

const get = (hash = location.hash) => {
    const extractedHash = hash.startsWith("#") ? hash.substring(1) : hash
    if (!extractedHash) {
        return
    }

    try {
        const state = extractedHash |> base77.decode |> Buffer.from |> pako.inflate |> serializer.decode
        return state
    } catch (e) {
        console.error(e)
        location.hash = ""
    }
}

const set = state => {
    const encoded = state |> serializer.encode |> pako.deflate |> Buffer.from |> base77.encode
    location.hash = encoded
}

export default {
    get,
    set
}
