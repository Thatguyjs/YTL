## class StreamFilter
[src/stream/filter.mjs](/src/stream/filter.mjs)

#### Static variables
 - `Number` AUDIO = [`StreamInfo`](info.md)`.AUDIO`
 - `Number` VIDEO = [`StreamInfo`](info.md)`.VIDEO`
 - `Number` ANY = [`StreamInfo`](info.md)`.AUDIO` | [`StreamInfo`](info.md)`.VIDEO`

#### new StreamFilter(streams: Array\<[StreamInfo](info.md)\>, adaptive_streams: Array\<[StreamInfo](info.md)\>)
Creates a new `StreamFilter` instance, with the stream lists split up as `streams` and `adaptive_streams`. Both stream arrays contain [`StreamInfo`](info.md) instances.

#### static from_video(video: VideoInfo)
Creates a new `StreamFilter` instance from a [`VideoInfo`](../video/info.md) instance.  
<b>Returns:</b> a new `StreamFilter` instance

#### apply(types: Number, options: Object)
Applies filters to the current list of streams. `types` contains the stream type(s) to use while filtering, and can be [`StreamFilter`](info.md)`.AUDIO`, [`StreamFilter`](info.md)`.VIDEO`, or [`StreamFilter`](info.md)`.ANY`. `options` modifies how the streams are filtered.  
Possible keys for `options`:
 - `Boolean` include_adaptive - When `true`, adaptive streams are added to the filtering list
 - `Number` min_resolution - The minimum resolution allowed for Video (+ Audio) streams
 - `Number` min_bitrate - The minimum bitrate allowed for Audio (+ Video) streams
 - `Number` best - When set, the best quality streams are found from the stream type(s) provided. Not recommended to combine with `min_resolution` or `min_bitrate`

<b>Returns:</b> an array of [`StreamInfo`](info.md) objects that passed all filters
