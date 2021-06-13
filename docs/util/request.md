## request
[src/util/request.mjs](/src/util/request.mjs)

#### get(url: String, headers: Object, body: String | Buffer)
Performs an https GET request to `url`, using the optional parameters `headers` and `body` if provided.  
<b>Throws:</b> if the response body couldn't be read, or if the response status code is not 200 (redirect codes are automatically handled and will _not_ throw an error)  
<b>Returns:</b> `Promise<Object>` where `Object` contains the properties `response`: `https.IncomingMessage` and `body`: `String`

#### post(url: String, headers: Object, body: String | Buffer)
Same as `get(url, headers, body)` but sends a POST request instead. `headers` and `body` are optional parameters.  
<b>Throws:</b> if the response body couldn't be read, or if the response status code is not 200 (redirect codes are automatically handled and will _not_ throw an error)  
<b>Returns:</b> `Promise<Object>` where `Object` contains the properties `response`: `https.IncomingMessage` and `body`: `String`

#### get_video_page(id: String)
Sends a GET request to YouTube for the video with the appropriate ID. `id` may be a video ID or a complete video URL.  
<b>Throws:</b> if the response body couldn't be read, or if the response status code is not 200 (redirect codes are automatically handled and will _not_ throw an error)  
<b>Returns:</b> `Promise<Object>` where `Object` contains the properties `response`: `https.IncomingMessage` and `body`: `String`

#### get_embed_page(id: String)
Sends a GET request to YouTube for the video's embed page with the appropriate ID. `id` may be a video ID or a complete embed URL.  
<b>Throws:</b> if the response body couldn't be read, or if the response status code is not 200 (redirect codes are automatically handled and will _not_ throw an error)  
<b>Returns:</b> `Promise<Object>` where `Object` contains the properties `response`: `https.IncomingMessage` and `body`: `String`

#### get_playlist_page(id: String)
Sends a GET request to YouTube for the playlist with the appropriate ID. `id` may be a playlist id or a complete playlist URL.  
<b>Throws:</b> if the response body couldn't be read, or if the response status code is not 200 (redirect codes are automatically handled and will _not_ throw an error)  
<b>Returns:</b> `Promise<Object>` where `Object` contains the properties `response`: `https.IncomingMessage` and `body`: `String`
