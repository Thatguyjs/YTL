## class StreamLoader
[src/stream/loader.mjs](/src/stream/loader.mjs)

#### instance variables
 - `Boolean` adaptive = false

#### new StreamLoader(options: Object)
Creates a new `StreamLoader` instance, uses `options` to modify settings.  
Possible keys for `options`:
 - [`Cipher`](../cipher/cipher.md) cipher - Used as the cipher to apply to all queued streams
 - `Boolean` adaptive - Whether the `StreamLoader` is for adaptive streams

#### queue(stream: Object | Array\<Object\>)
Queues a stream object to be loaded later. `stream` can be an `Object` that has been parsed from a YouTube video page, or an array of said objects.  
<b>Throws:</b> a `TypeError` if `stream` is an Array and contains non-object elements, or if `stream` is not of type `Object`  
<b>Returns:</b> the index of `stream` in the queue

#### remove(index: Number)
Removes a stream from the queue, at position `index`\.  
<b>Throws:</b> an `Error` if `index` if not a number, or is not a valid position in the queue

#### load_next()
Loads the next stream in the queue, if possible.  
<b>Returns:</b> `null` if the queue is empty, and a [`StreamInfo`](info.md) instance otherwise

#### load_all()
Loads all streams in the queue, if possible.  
<b>Returns:</b> `Array<`[`StreamInfo`](info.md)`>` containing all loaded streams. May be empty if no streams were loaded

#### static load_all(streams: Array\<Object\>, options: Object)
Creates a new `StreamLoader` instance, loads all `streams`, and returns the result. `options` is passed into the constructor of the new `StreamLoader` instance.  
<b>Returns:</b> `Array<`[`StreamInfo`](info.md)`>` containing all loaded streams. May be empty if no streams were loaded
