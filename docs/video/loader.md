## class VideoLoader
[src/video/loader.mjs](/src/video/loader.mjs)

#### Events emitted
 - `video` - Emitted when a video in the queue has been loaded.  
   Arguments: ([`VideoInfo`](info.md))

#### Getter / Setter methods
 - get length() - returns the amount of items in the queue  
   <b>Return type:</b> `Number`

#### new VideoLoader()
Creates a new `VideoLoader` instance.

#### queue(id: String | Array\<String\>)
Queues video URL(s) or ID(s) to be loaded later.  
<b>Throws:</b> a `TypeError` if `id` is an `Array` and contains a non-string element, or if `id` is not of type `String`  
<b>Returns:</b> the index of `id` in the queue, if `id` is a `String`. Returns nothing if `id` was an `Array<String>`

#### remove(index: Number)
Removes an item from the queue at `index`\.  
<b>Throws:</b> an `Error` if `index` if not a number, or is not a valid position in the queue

#### async load_next()
Loads the next video in the queue, if possible.  
<b>Returns:</b> `null` if the queue is empty, a [`VideoInfo`](info.md) instance otherwise

#### async load_at(index: Number)
Loads the video in the queue at `index`\.  
<b>Throws:</b> an `Error` if there is at least 1 item in the queue _and_ `index` is not a valid position in the queue  
<b>Returns:</b> `null` if the queue is empty, a [`VideoInfo`](info.md) instance otherwise

#### async load_all()
Loads all videos in the queue in the same order they were added. Internally, this method waits for one video to finish loading before starting the next one  
<b>Returns:</b> `Array<`[`VideoInfo`](info.md)`>` containing the loaded videos. The array may be empty if no videos were loaded

#### async load_all_unordered()
<b>Warning: This method is not recommended, because of the possibility for hundreds of requests to be made at once</b>  
Loads all videos in the queue by making all requests at once. By doing so, the order in which the videos load is not guaranteed.  
<b>Returns:</b> `Array<`[`VideoInfo`](info.md)`>` containing the loaded videos. The array may be empty if no videos were loaded

#### static async load_all(urls: Array<String>)
Creates a new `VideoLoader` instance, queues `urls`, and loads all queued items.  
<b>Throws:</b> a `TypeError` if `urls` contains a non-string element  
<b>Returns:</b> `Array<`[`VideoInfo`](info.md)`>` containing the loaded videos. The array may be empty if no videos were loaded
