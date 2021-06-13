## class CipherLoader
[src/cipher/loader.mjs](/src/cipher/loader.mjs)

#### new CipherLoader(player: String)
Creates a new `CipherLoader` instance. `player` is a YouTube player file URL.

#### static async from_video_id(id: String)
Creates a new `CipherLoader` instance from a video ID or `/embed` URL.  
<b>Returns:</b> a new `CipherLoader` instance  
<b>Throws:</b> an `Error` if the player file could not be found in the video page

#### static async is_cached(player_name: String)
Checks the `src/cipher/cache` directory to check if a cipher has been cached.  
<b>Returns:</b> `true` if a file with the same name as `player_name` exists, and `false` otherwise

#### async load()
Loads the player file and extracts the cipher function, if needed.  
<b>Throws:</b> an `Error` if the cipher function _could not_ be extracted, or if the function's helper object _could not_ be extracted

#### get_cipher()
Creates and returns a new [`Cipher`](cipher.md) instance for the loaded cipher function.  
<b>Returns:</b> `false` if the cipher function has not been loaded, and a [`Cipher`](cipher.md) instance otherwise
