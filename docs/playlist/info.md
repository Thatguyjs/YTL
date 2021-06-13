## class PlaylistInfo
[src/playlist/info.mjs](/src/playlist/info.mjs)

#### Instance variables
 - `String` id = ""
 - `String` title = ""
 - `String` description = ""
 - `Object` author
   - `String` id = ""
   - `String` name = ""
 - [`VideoLoader`](../video/loader.md) loader = new [VideoLoader](../video/loader.md)()
 - `Number` video_count
 - `Array<String>` video_ids

#### new PlaylistInfo(info: Object, videos: Array\<Object\>)
Creates a new `PlaylistInfo` instance. `info` contains basic info for the playlist, and was parsed from the playlist's page on YouTube. `videos` is an `Array` of `Objects`, with each object having a `index` key for the video's index in the playlist, and an `id` key for the video's ID.  

#### async load_next_video()
Loads the next video in the playlist, using the instance variable `loader`. Alias for [`VideoLoader`](../video/loader.md)`.load_next()`\.  
<b>Returns:</b> `null` if the queue is empty, a [`VideoInfo`](../video/info.md) instance otherwise

#### async load_all_videos()
Loads all videos in the playlist, using the instance variable `loader`. Alias for [`VideoLoader`](../video/loader.md)`.load_all()`\.  
<b>Returns:</b> `Array<`[`VideoInfo`](../video/info.md)`>` containing the loaded videos. The array may be empty if no videos were loaded
