// Filter normal / adaptive streams

import StreamInfo from "./info.mjs";


class StreamFilter {
	
	// Stream types
	static AUDIO = StreamInfo.AUDIO;
	static VIDEO = StreamInfo.VIDEO;
	static ANY = StreamInfo.AUDIO | StreamInfo.VIDEO;


	#streams = {
		normal: [],
		adaptive: []
	};


	constructor(streams, adaptive_streams) {
		this.#streams.normal = streams;
		this.#streams.adaptive = adaptive_streams;
	}


	// Create an instance from a VideoInfo class
	static from_video(video) {
		return new StreamFilter(video.streams.formats, video.streams.adaptive_formats);
	}


	// Helper methods
	
	#filter_type(type, stream) {
		if((type & StreamFilter.VIDEO) !== 0 && stream.has_type(StreamFilter.VIDEO))
			return true;

		if((type & StreamFilter.AUDIO) !== 0 && stream.has_type(StreamFilter.AUDIO))
			return true;

		return false;
	}

	#filter_options(type, options, stream) {
		if(!this.#filter_type(type, stream)) return false;

		if(options.min_resolution) {
			let res = +stream.code.resolution?.slice(0, -1);
			console.log("Res:", res);
			if(isNaN(res) || res < options.min_resolution) return false;
		}

		if(options.min_bitrate) {
			let rate = +stream.code.bitrate?.slice(0, -4);
			if(isNaN(rate) || rate < options.min_bitrate) return false;
		}

		return true;
	}

	#is_better(type, stream, best) {
		if(!stream.has_type(type)) return false;

		if(type === StreamFilter.VIDEO) {
			if(!best) return true;

			let stream_res = +stream.code.resolution?.slice(0, -1);
			let best_res = +best.code.resolution?.slice(0, -1);

			if(isNaN(stream_res) || stream_res < best_res) return false;
		}
		else if(type === StreamFilter.AUDIO) {
			if(!best) return true;

			let stream_rate = +stream.code.bitrate?.slice(0, -4);
			let best_rate = +best.code.bitrate?.slice(0, -4);

			if(isNaN(stream_rate) || stream_rate < best_rate) return false;
		}
		else return false;

		return true;
	}


	// Filter out streams
	apply(type, options={}) {
		let streams = this.#streams.normal;
		if(options.include_adaptive) streams = streams.concat(this.#streams.adaptive);

		let result = [];
		let best = { audio: null, video: null };

		for(let s in streams) {
			if(options.best) {
				if(this.#is_better(StreamFilter.VIDEO, streams[s], best.video)) {
					best.video = streams[s];
				}
				if(this.#is_better(StreamFilter.AUDIO, streams[s], best.audio)) {
					best.audio = streams[s];
				}
			}
			else if(this.#filter_options(type, options, streams[s])) {
				result.push(streams[s]);
			}
		}

		if((options.best & StreamFilter.VIDEO) !== 0)
			result.push(best.video);

		if((options.best & StreamFilter.AUDIO) !== 0)
			result.push(best.audio);

		return result;
	}

}


export default StreamFilter;
