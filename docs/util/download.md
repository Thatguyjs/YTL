## download
[src/util/download.mjs](/src/util/download.mjs)

#### async download_best_audio(vid_info: [VideoInfo](../video/info.md), dest: String)
Downloads the stream from `vid_info` with the best audio quality, and writes the result to `dest`.  
<b>Throws:</b> an `Error` if `vid_info` is not a [`VideoInfo`](../video/info.md) instance  
<b>Returns:</b> `null` if no streams were chosen, and a `Promise<Object>` otherwise

#### async download_best_video(vid_info: [VideoInfo](../video/info.md), dest: String)
Downloads the stream from `vid_info` with the best video quality, and writes the result to `dest`.  
<b>Throws:</b> an `Error` if `vid_info` is not a [`VideoInfo`](../video/info.md) instance  
<b>Returns:</b> `null` if no streams were chosen, and a `Promise<Object>` otherwise

#### async download_stream(stream_info: [StreamInfo](../stream/info.md), dest: String)
Downloads the stream specified in `stream_info`, writes the result to `dest`\.  
<b>Throws:</b> an `Error` if `stream_info` is not a [`StreamInfo`](../stream/info.md) instance  
<b>Returns:</b> a `Promise<Object>` with `Object` containing the properties `filepath`: `String` and `stream`: `StreamInfo`
