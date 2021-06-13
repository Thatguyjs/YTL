// Extract & format video info from a page

import { StreamLoader } from "../stream/export.mjs";
import Duration from "../util/duration.mjs";


class VideoInfo {

	// Signature cipher
	cipher = null;

	// General info
	id = "";
	title = "";
	length = null;
	keywords = [];
	description = "";
	views = -1;
	thumbnails = [];
	category = "";

	published = "";
	uploaded = "";


	// Channel info
	channel = {
		id: "",
		name: ""
	};


	// Stream info
	streams = {
		expires: null,
		formats: [],
		adaptive_formats: []
	};


	// Captions info
	captions = {
		tracks: [],
		audio_tracks: [],
		languages: []
	};


	// Create a VideoInfo instance from a YouTube video info object
	constructor(vid_object, cipher) {
		this.cipher = cipher;

		this.id = vid_object.videoDetails.videoId;
		this.title = vid_object.videoDetails.title;
		this.length = Duration.seconds(+vid_object.videoDetails.lengthSeconds);
		this.keywords = vid_object.videoDetails.keywords;
		this.description = vid_object.videoDetails.shortDescription;
		this.views = +vid_object.videoDetails.viewCount;
		this.thumbnails = vid_object.videoDetails.thumbnail.thumbnails;
		this.category = vid_object.microformat.playerMicroformatRenderer.category;

		this.published = vid_object.microformat.playerMicroformatRenderer.publishDate;
		this.uploaded = vid_object.microformat.playerMicroformatRenderer.uploadDate;

		this.channel.id = vid_object.videoDetails.channelId;
		this.channel.name = vid_object.microformat.playerMicroformatRenderer.ownerChannelName;

		this.streams.expires = Duration.seconds(+vid_object.streamingData.expiresInSeconds);
		this.streams.formats = StreamLoader.load_all(vid_object.streamingData.formats, { cipher: this.cipher });
		this.streams.adaptive_formats = StreamLoader.load_all(vid_object.streamingData.adaptiveFormats, { cipher: this.cipher, adaptive: true });

		this.captions.tracks = vid_object.captions?.playerCaptionsTracklistRenderer.captionTracks;
		this.captions.audio_tracks = vid_object.captions?.playerCaptionsTracklistRenderer.audioTracks;
		this.captions.languages = vid_object.captions?.playerCaptionsTracklistRenderer.translationLanguages;
	}

}


export default VideoInfo;
