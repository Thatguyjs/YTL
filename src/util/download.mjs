// Download videos from VideoInfo or specific streams

import { VideoInfo } from "../video/export.mjs";
import { StreamInfo, StreamFilter } from "../stream/export.mjs";

import https from "https";
import fs from "fs";


function assert_is_instance(base, base_name, instance) {
	if(!(instance instanceof base)) throw new Error(`Expected type ${base_name}, got ${typeof instance}`);
}


async function request_to_file(url, dest_path) {
	const write_stream = fs.createWriteStream(dest_path);

	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			res.pipe(write_stream);
			
			res.on('error', (err) => {
				write_stream.end();
				reject(err);
			});

			res.on('end', () => {
				write_stream.end();
				resolve();
			});
		});
	});
}


export default {

	async download_best_audio(vid_info, dest) {
		assert_is_instance(VideoInfo, 'VideoInfo', vid_info);

		const filter = StreamFilter.from_video(vid_info);
		const best_audio = filter.apply(StreamFilter.ANY, { best: StreamFilter.AUDIO, include_adaptive: true })[0];

		if(!best_audio) return null;
		return this.download_stream(best_audio);
	},


	async download_best_video(vid_info, dest) {
		assert_is_instance(VideoInfo, 'VideoInfo', vid_info);

		const filter = StreamFilter.from_video(vid_info);
		const best_video = filter.apply(StreamFilter.ANY, { best: StreamFilter.VIDEO, include_adaptive: true })[0];

		if(!best_video) return null;
		return this.download_stream(best_video);
	},


	async download_stream(stream_info, dest) {
		assert_is_instance(StreamInfo, 'StreamInfo', stream_info);

		await request_to_file(stream_info.url, dest);
		return { filepath: dest, stream: stream_info };
	}

};
