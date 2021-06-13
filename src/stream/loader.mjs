// Load streams / stream info from video / playlist info

import StreamInfo from "./info.mjs";

import url from "url";


class StreamLoader {

	adaptive = false;

	#queue = [];
	#cipher = null;


	constructor(options={}) {
		// TODO: More options (passive filters, include / ignore adaptive, sorting)

		this.#cipher = options.cipher ?? null;
		this.adaptive = options.adaptive ?? false;
	}


	// Decode a video signature
	#decode_signature(stream) {
		const qs = new url.URLSearchParams(stream.signatureCipher);
		return qs.get('url') + '&sig=' + this.#cipher.apply(qs.get('s'));
	}


	// Add a stream to the queue
	queue(stream) {
		if(Array.isArray(stream)) {
			for(let s in stream) {
				if(typeof stream[s] !== 'object') throw new TypeError("Invalid stream: " + (typeof stream[s]));
				this.queue(stream[s]);
			}

			return;
		}

		if(typeof stream !== 'object') throw new TypeError("Invalid stream: " + (typeof stream));

		return this.#queue.push(stream) - 1;
	}


	// Remove a stream from the queue
	remove(index) {
		if(typeof index !== 'number' || index < 0 || index >= this.#queue.length)
			throw new Error("Invalid index: " + index);

		this.#queue.splice(index, 1);
	}


	// Load the next stream in the queue
	load_next() {
		if(this.#queue.length === 0) return null;

		const item = this.#queue.shift();

		// Signature needs decoding
		if(!item.url) item.url = this.#decode_signature(item);

		return new StreamInfo(item, this.adaptive);
	}


	// Load all streams in the queue
	load_all() {
		let result = [];
		let next = this.load_next();

		while(next !== null) {
			result.push(next);
			next = this.load_next();
		}

		return result;
	}


	// Queue and load all streams in an array
	static load_all(streams, options={}) {
		const loader = new StreamLoader(options);
		loader.queue(streams);

		return loader.load_all();
	}

}


export default StreamLoader;
