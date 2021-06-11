// Load playlist information

import { VideoInfo, VideoLoader } from "../video/export.mjs";


class PlaylistInfo {

	id = "";
	title = "";
	description = "";

	author = {
		id: "",
		name: ""
	};

	loader = new VideoLoader();
	video_count = 0;
	video_ids = [];


	constructor(info, videos) {
		this.id = info.id;
		this.title = info.title;
		this.description = info.description;

		this.author.id = info.author.id;
		this.author.name = info.author.name;

		this.video_ids = videos.map(item => item.id);
		this.video_count = this.video_ids.length;
		this.loader.queue(this.video_ids);
	}


	// Load videos
	
	async load_next_video() {
		return this.loader.load_next();
	}

	async load_all_videos() {
		return this.loader.load_all();
	}

}


export default PlaylistInfo;
