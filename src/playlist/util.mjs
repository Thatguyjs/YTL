// Helper code for requesting / getting playlist info

import request from "../util/request.mjs";


const PlaylistUtil = {

	// Get playlist info from the main playlist page
	get_playlist_info: function(id, page) {
		let fmt_start = page.indexOf('"microformatDataRenderer":');
		fmt_start = page.indexOf('{', fmt_start);

		let fmt_end = fmt_start + 1;
		let depth = 0;

		while(page[fmt_end] !== '}' || depth > 0) {
			if(page[fmt_end] === '{') depth++;
			else if(page[fmt_end] === '}') depth--;

			fmt_end++;
		}

		const fmt = JSON.parse(page.slice(fmt_start, fmt_end + 1));

		let author_start = page.indexOf('"videoOwnerRenderer":');
		author_start = page.indexOf('{', author_start);

		let author_end = author_start + 1;
		depth = 0;

		while(page[author_end] !== '}' || depth > 0) {
			if(page[author_end] === '{') depth++;
			else if(page[author_end] === '}') depth--;

			author_end++;
		}

		const author = JSON.parse(page.slice(author_start, author_end + 1));

		return {
			id,
			title: fmt.title,
			description: fmt.description,
			thumbnails: fmt.thumbnail.thumbnails,
			unlisted: fmt.unlisted, // Unused for now

			author: {
				id: author.navigationEndpoint.browseEndpoint.browseId,
				name: author.title.runs[0].text
			}
		};
	},


	// Get request info from the main playlist page
	get_request_info: function(page) {
		let result = {};

		// Get the API key
		let key_start = page.indexOf('"INNERTUBE_API_KEY":');

		if(key_start === -1) result.api_key = null;
		else {
			key_start = page.indexOf('"', key_start + '"INNERTUBE_API_KEY":'.length) + 1;
			result.api_key = page.slice(key_start, page.indexOf('",', key_start));
		}

		// Get the client version
		let version_start = page.indexOf('"INNERTUBE_CONTEXT_CLIENT_VERSION":');

		if(version_start === -1) result.client_version = null;
		else {
			version_start = page.indexOf('"', version_start + 35) + 1;
			result.client_version = page.slice(version_start, page.indexOf('",', version_start));
		}

		// Get the continuation string
		let cont_start = page.indexOf('"continuationCommand":');

		if(cont_start === -1) result.continuation = null;
		else {
			cont_start = page.indexOf('"', page.indexOf('"token":', cont_start) + 8) + 1;
			result.continuation = page.slice(cont_start, page.indexOf('"', cont_start));
		}

		return result;
	},


	// Create a new request context object from page info
	create_request_context: function(req_info) {
		if(!req_info.client_version) throw new Error("Missing client version from req_info");
		if(!req_info.continuation) throw new Error("Missing continuation from req_info");

		return {
			context: {
				client: {
					utcOffsetMinutes: req_info.utc_offset ?? 0,
					gl: req_info.gl ?? 'US',
					hl: req_info.hl ?? 'en',
					clientName: 'WEB',
					clientVersion: req_info.client_version
				},

				user: {},
				request: {}
			},

			continuation: req_info.continuation
		};
	},


	// Generate request info from a context and page info
	generate_request: function(page_info, context) {
		return {
			url: `https://www.youtube.com/youtubei/v1/browse?key=${page_info.api_key}`,
			headers: {},
			body: JSON.stringify(context)
		};
	},


	// Extract videos from a page
	extract_videos: function(page) {
		let videos = [];
		let vid_index = page.indexOf('"playlistVideoRenderer":');

		while(vid_index !== -1) {
			vid_index = page.indexOf('"videoId":', vid_index);

			const id_start = page.indexOf('"', vid_index + 10) + 1;
			const id_end = page.indexOf('",', id_start);
			const id = page.slice(id_start, id_end);

			vid_index = page.indexOf('"index":', id_end);
			vid_index = page.indexOf('"simpleText":', vid_index + 8);

			const ind_start = page.indexOf('"', vid_index + 13) + 1;
			const ind_end = page.indexOf('"', ind_start);

			videos.push({ id, index: +page.slice(ind_start, ind_end) });
			vid_index = page.indexOf('"playlistVideoRenderer":', vid_index + 1);
		}

		return videos;
	},


	// Request and extract a page of playlist videos
	request_videos: async function(req_info, pl_info=null) {
		const page = (await request.post(req_info.url, req_info.headers, req_info.body)).body;
		if(pl_info !== null) Object.assign(pl_info, await this.get_raw_playlist_info(page));

		return {
			videos: this.extract_videos(page),
			continuation: this.get_request_info(page).continuation
		};
	}

};


export default PlaylistUtil;
