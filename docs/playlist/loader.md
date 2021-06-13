## class PlaylistLoader
[src/playlist/loader.mjs](/src/playlist/loader.mjs)

#### Getter / Setter methods
 - get length() - returns the amount of items in the queue  
   <b>Return type:</b> `Number`

#### new PlaylistLoader()
Creates a new `PlaylistLoader` instance.

#### queue(id: String | Array\<String\>)
Queues playlist URL(s) or ID(s) to be loaded later.  
<b>Throws:</b> a `TypeError` if `id` is an `Array` and contains a non-string element, or if `id` is not of type `String`  
<b>Returns:</b> the index of `id` in the queue, if `id` is a `String`. Returns nothing if `id` was an `Array<String>`

#### remove(index: Number)
Removes an item from the queue at `index`\.  
<b>Throws:</b> an `Error` if `index` if not a number, or is not a valid position in the queue

#### async load_next()
Loads the next playlist in the queue, if possible.  
<b>Returns:</b> `null` if the queue is empty, and a [`PlaylistInfo`](info.md) instance otherwise
