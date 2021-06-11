// Find, load, and parse the cipher function from a player file

import Cipher from "./cipher.mjs";
import request from "../util/request.mjs";
import get_dir from "../util/dir.mjs";

import { constants as fs_constants } from "fs";
import pfs from "fs/promises";


class CipherLoader {

	// Player file name & url
	#player_name = "";
	#player_url = "";

	// Whether the cipher has been loaded
	#loaded = false;


	constructor(player) {
		if(player.includes('https://')) {
			this.#player_url = player;
		}
		else {
			this.#player_url = `https://www.youtube.com`;
			if(player[0] === '/') this.#player_url += player;
			else this.#player_url += '/' + player;
		}

		player = player.slice(0, player.lastIndexOf('.'));
		this.#player_name = player.replace(/(<|>|:|"|\/|\\|\||\?|\*)/g, '-');
	}


	// Load from a video ID
	static async from_video_id(id) {
		if(id.includes('/embed/')) id = id.slice(id.indexOf('/embed/') + 7);

		let page = (await request.get_embed_page(id)).body;

		let url_start = page.indexOf('"jsUrl":');
		if(url_start === -1) throw new Error("Could not find player file");
		url_start = page.indexOf('"', url_start + 8) + 1;

		let url_end = page.indexOf('",', url_start + 1);

		return new CipherLoader(page.slice(url_start, url_end));
	}


	// Check if a cipher is already cached
	static async is_cached(player_name) {
		const path = `${get_dir(import.meta.url)}/cache/${player_name}.mjs`;

		return new Promise((res, rej) => {
			pfs.access(path, fs_constants.F_OK)
				.then(() => { res(true); })
				.catch(() => { res(false); });
		});
	}


	// Cache a cipher function
	async #cache_cipher(func_source, obj_name, obj_source) {
		let source = `const ${obj_name} = {\n${obj_source}\n};\n\n`;
		source += `export default function(a) {\n${func_source}\n}`;

		return pfs.writeFile(`./src/cipher/cache/${this.#player_name}.mjs`, source);
	}


	// Load the player file
	async load() {
		if(await CipherLoader.is_cached(this.#player_name)) {
			this.#loaded = true;
			return;
		}

		let source = (await request.get(this.#player_url)).body;

		// Get the function code
		let start_func = source.indexOf('a=a.split("");');
		if(start_func === -1) return new Error("Could not find cipher function");

		let end_func = source.indexOf('};', start_func);

		let func = source.slice(start_func, end_func);

		// Get the helper object code
		let obj_name = func.slice(func.indexOf(';') + 1);
		obj_name = obj_name.slice(0, obj_name.indexOf('.'));

		let obj_start = source.indexOf(`var ${obj_name}={`);
		if(obj_start === -1) return new Error("Could not find helper object");
		obj_start += obj_name.length + 6;

		let obj_end = source.indexOf('};', obj_start);

		let obj = source.slice(obj_start, obj_end);

		await this.#cache_cipher(func, obj_name, obj);
		this.#loaded = true;
	}


	// Get the cipher if it's been loaded
	get_cipher() {
		if(!this.#loaded) return false;
		return new Cipher(this.#player_name);
	}

}


export default CipherLoader;
