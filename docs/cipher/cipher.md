## class Cipher
[src/cipher/cipher.mjs](/src/cipher/cipher.mjs)

#### new Cipher(name: String)
Creates a new `Cipher` instance, uses the `name` parameter as the filename to the cipher function.

#### async load()
Loads the cipher function from the path given in the constructor. The cipher functions are stored in / loaded from the directory `src/cipher/cache`\.  
<b>Throws:</b> a `TypeError` if the imported file does not contain the cipher function

#### apply(signature: String)
Applies the cipher function to `signature`, and returns the result.  
<b>Returns:</b> the result of the ciphered signature  
<b>Throws:</b> an `Error` if the cipher has not been loaded
