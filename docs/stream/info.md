## class StreamInfo
[src/stream/info.mjs](/src/stream/info.mjs)

#### Static variables
 - `Number` AUDIO = 1
 - `Number` VIDEO = 2
 - `Number` UNKNOWN = 4

#### Instance variables
 - `Boolean` is_adaptive = false
 - [`FormatCode`](itags.md) code = null
 - `Number` type = 0
 - `String` mime = ""
 - `Number` length = 0
 - `Number` bitrate = 0
 - `Number` fps = 0
 - `String` quality = ""
 - `String` quality_label = ""
 - `String` signature = ""
 - `String` url = ""

#### new StreamInfo(stream_obj: Object, is_adaptive: Boolean)
Creates a new `StreamInfo` instance. `stream_obj` is a previously-parsed `Object` from a YouTube video page. `is_adaptive` is `false` by default, and marks the stream as adaptive when `true`.

#### has_type(type: Number)
Checks if the `StreamInfo` type includes `type`\.  
<b>Returns:</b> `true` if the `StreamInfo` type contains `type`, `false` otherwise

#### is_type(type: Number)
Checks if the `StreamInfo` type exactly matches `type`\.  
<b>Returns:</b> `true` if the `StreamInfo` type exactly matches `type`, `false` otherwise
