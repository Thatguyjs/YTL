// Load playlists

import PlaylistInfo from "./info.mjs";
import PlaylistUtil from "./util.mjs";
import request from "../util/request.mjs";

import EventEmitter from "events";
import https from "https";


class PlaylistLoader {

	#queue = [];

	constructor(options) {
		// TODO: Use options
	}


	// Add a playlist to the queue
	queue(id) {
		if(Array.isArray(id)) {
			for(let i in id) {
				if(typeof id[i] !== 'string') throw new TypeError("Invalid playlist url / id: " + id[i]);
				this.queue(id[i]);
			}

			return;
		}

		if(typeof id !== 'string') throw new TypeError("Invalid playlist url / id: " + id);

		if(id.includes('?list=')) id = id.slice(id.indexOf('?list=') + 6);
		return this.#queue.push(id) - 1;
	}


	// Remove a playlist from the queue
	remove(index) {
		if(typeof index !== 'number' || index < 0 || index >= this.#queue.length)
			throw new Error("Invalid index: " + index);

		this.#queue.splice(index, 1);
	}


	// Load a playlist from a queue id
	async #load(item) {
		const pl_page = await request.get_playlist_page(item);
		let request_info = PlaylistUtil.get_request_info(pl_page.body);
		
		// Load the videos that YouTube initially includes on the playlist page
		let videos = PlaylistUtil.extract_videos(pl_page.body);

		while(request_info.continuation) {
			const context = PlaylistUtil.create_request_context(request_info);
			const req = PlaylistUtil.generate_request(request_info, context);

			const page_response = await PlaylistUtil.request_videos(req);
			videos.push(...page_response.videos);

			request_info.continuation = page_response.continuation;
		}

		return new PlaylistInfo(PlaylistUtil.get_playlist_info(item, pl_page.body), videos);
	}


	// Load the next item in the queue
	async load_next() {
		if(this.#queue.length === 0) return null;

		return this.#load(this.#queue.shift());
	}

}


export default PlaylistLoader;
