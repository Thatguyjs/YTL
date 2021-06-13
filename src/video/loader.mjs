// Load video info from a list of URLs or video IDs

import VideoInfo from "./info.mjs";
import { CipherLoader } from "../cipher/export.mjs";

import request from "../util/request.mjs";

import EventEmitter from "events";


class VideoLoader {

	#queue = [];
	#emitter = new EventEmitter();


	constructor(options) {
		// TODO: Use options (threading / async, multiple at once, page request limiting, more / less detailed info)
	}


	// Add a video to the queue
	queue(id) {
		if(Array.isArray(id)) {
			for(let i in id) {
				if(typeof id[i] !== 'string') throw new TypeError("Invalid video url / id: " + id[i]);
				this.queue(id[i]);
			}

			return;
		}

		if(typeof id !== 'string') throw new TypeError("Invalid video url / id: " + id);

		if(id.includes('?v=')) id = id.slice(id.indexOf('?v=') + 3);
		return this.#queue.push(id) - 1;
	}


	// Remove a video from the queue
	remove(index) {
		if(typeof index !== 'number' || index < 0 || index >= this.#queue.length)
			throw new Error("Invalid index: " + index);

		this.#queue.splice(index, 1);
	}


	// Load a video from a queued id
	async #load(item) {
		const main_page = (await request.get_video_page(item)).body;

		let main_start = main_page.indexOf("var ytInitialPlayerResponse");
		if(main_start === -1) return null;
		main_start = main_page.indexOf('{', main_start);

		let main_end = main_page.indexOf('</script>', main_start) - 1;

		let video_obj = JSON.parse(main_page.slice(main_start, main_end));

		let cipher_loader = await CipherLoader.from_video_id(item);
		await cipher_loader.load();

		let cipher = cipher_loader.get_cipher();
		await cipher.load();

		const info = new VideoInfo(video_obj, cipher);

		this.#emitter.emit('video', info);
		return info;
	}


	// Load the next video in the queue
	async load_next() {
		if(this.#queue.length === 0) return null;

		return this.#load(this.#queue.shift());
	}


	// Load a video at a specific point in the queue
	async load_at(index) {
		if(this.#queue.length === 0) return null;
		if(typeof index !== 'number' || index < 0 || index >= this.#queue.length)
			throw new Error("Invalid index: " + index);

		return this.#load(this.#queue.splice(index, 1));
	}


	// Load all videos in the queue, 1 at a time
	async load_all() {
		let result = [];
		let next = await this.load_next();

		while(next !== null) {
			result.push(next);
			next = await this.load_next();
		}

		return result;
	}


	// Load all videos in the queue, without waiting for each one
	async load_all_unordered() {
		let result = [];
		const length = this.#queue.length;

		for(let _ = 0; _ < length; _++) {
			result.push(this.load_next());
		}

		return Promise.all(result);
	}


	// Queue and load all videos without creating a VideoLoader instance
	static async load_all(urls) {
		const loader = new VideoLoader();
		loader.queue(urls);

		return loader.load_all();
	}


	// Get the queue length
	get length() {
		return this.#queue.length;
	}


	// Tie to the EventEmitter
	on(...args) { return this.#emitter.on(...args); }
	once(...args) { return this.#emitter.once(...args); }

}


export default VideoLoader;
