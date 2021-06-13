// Get stream formats

import itags from "./itags.mjs";

import url from "url";


class StreamInfo {

	// Format types
	static AUDIO = 1;
	static VIDEO = 2;
	static UNKNOWN = 4;


	is_adaptive = false;

	code = null;
	type = 0;
	mime = "";

	length = 0;

	bitrate = 0;
	fps = 0;

	quality = "";
	quality_label = "";

	signature = "";
	url = "";


	constructor(obj, is_adaptive=false) {
		this.is_adaptive = is_adaptive;

		this.code = itags.PROGRESSIVE_VIDEO[obj.itag] ||
					itags.DASH_VIDEO[obj.itag] ||
					itags.DASH_AUDIO[obj.itag] ||
					null;

		if(this.code.itag in itags.PROGRESSIVE_VIDEO) this.type = StreamInfo.AUDIO | StreamInfo.VIDEO;
		else if(this.code.itag in itags.DASH_VIDEO) this.type = StreamInfo.VIDEO;
		else if(this.code.itag in itags.DASH_AUDIO) this.type = StreamInfo.AUDIO;
		else this.type = StreamInfo.UNKNOWN;

		this.mime = obj.mimeType;

		this.length = +obj.contentLength;
		if(isNaN(this.length)) this.length = null;

		this.bitrate = obj.bitrate;
		this.fps = obj.fps ?? 0;

		this.quality = obj.quality;
		this.quality_label = obj.quality_label ?? 0;

		this.signature = obj.signatureCipher ?? null;
		this.url = obj.url;

		if(this.signature) {
			const qs = new url.URLSearchParams(this.signature);
			this.signature = qs.get('s');
		}
	}


	// Check if this format has a video or audio type
	has_type(type) {
		return (type & this.type) !== 0;
	}


	// Check if this format matches a type exactly
	is_type(type) {
		return type === this.type;
	}

}


export default StreamInfo;
