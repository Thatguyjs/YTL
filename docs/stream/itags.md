## class FormatCode
[src/stream/itags.mjs](/src/stream/itags.mjs)

#### Instance variables
 - `Number` itag = 0
 - `String` | `null` resolution = null
 - `String` | `null` bitrate = null
 - `String` format = ""

#### new FormatCode(itag: Number, resolution: String | null, bitrate: String | null, format: String)
Creates a new `FormatCode` instance. If the underlying type does not contain video, `resolution` will be `null`. Likewise, if the underlying type does not contain audio, `bitrate` will be `null`.
