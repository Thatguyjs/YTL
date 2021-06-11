// Use YouTube's cipher functions to decode video signatures


class Cipher {

	// YouTube player filename that included the cipher
	name = "";

	// The actual cipher function
	#cipher_func = null;

	#loaded = false;


	constructor(name) {
		this.name = name;
	}


	// Load the cipher function
	async load() {
		this.#cipher_func = (await import(`./cache/${this.name}.mjs`)).default;

		if(typeof this.#cipher_func !== 'function') {
			throw new TypeError("Invalid cipher function");
		}

		this.#loaded = true;
	}


	// Apply the cipher to a given signature
	apply(sig) {
		if(!this.#loaded) throw new Error("Cipher not loaded yet");
		return this.#cipher_func(sig);
	}

}


export default Cipher;
