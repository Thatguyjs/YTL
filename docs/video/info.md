## class VideoInfo
[src/video/info.mjs](/src/video/info.mjs)

#### Instance variables
 - [`Cipher`](../cipher/cipher.md) cipher = null
 - `String` id = ""
 - `String` title = ""
 - [`Duration`](../util/duration.md) length = null
 - `Array<String>` keywords = []
 - `String` description = ""
 - `Number` views = -1
 - `Array<Object>` thumbnails = []
 - `String` category = ""
 - `String` published = ""
 - `String` uploaded = ""
 - `Object` channel
   - `String` id = ""
   - `String` name = ""
 - `Object` streams
   - [`Duration`](../util/duration.md) expires = null
   - `Array<`[`StreamInfo`](../stream/info.md)`>` formats = []
   - `Array<`[`StreamInfo`](../stream/info.md)`>` adaptive_formats = []
 - `Object` captions
   - `Array<Object>` tracks = []
   - `Array<Object>` audio_tracks = []
   - `Array<String>` languages = []

#### new VideoInfo(vid_object: Object, cipher: [Cipher](../cipher/cipher.md))
Creates a new `VideoInfo` instance. `vid_object` is an `Object` parsed from the YouTube video page, and contains most of the information for instance variables. `cipher` is a [`Cipher`](../cipher/cipher.md) instance.
