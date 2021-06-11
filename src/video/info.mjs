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
	constructor(vidObject, cipher) {
		this.cipher = cipher;

		this.id = vidObject.videoDetails.videoId;
		this.title = vidObject.videoDetails.title;
		this.length = Duration.seconds(+vidObject.videoDetails.lengthSeconds);
		this.keywords = vidObject.videoDetails.keywords;
		this.description = vidObject.videoDetails.shortDescription;
		this.views = +vidObject.videoDetails.viewCount;
		this.thumbnails = vidObject.videoDetails.thumbnail.thumbnails;
		this.category = vidObject.microformat.playerMicroformatRenderer.category;

		this.published = vidObject.microformat.playerMicroformatRenderer.publishDate;
		this.uploaded = vidObject.microformat.playerMicroformatRenderer.uploadDate;

		this.channel.id = vidObject.videoDetails.channelId;
		this.channel.name = vidObject.microformat.playerMicroformatRenderer.ownerChannelName;

		this.streams.expires = Duration.seconds(+vidObject.streamingData.expiresInSeconds);
		this.streams.formats = StreamLoader.load_all(vidObject.streamingData.formats, { cipher: this.cipher });
		this.streams.adaptive_formats = StreamLoader.load_all(vidObject.streamingData.adaptiveFormats, { cipher: this.cipher, adaptive: true });

		this.captions.tracks = vidObject.captions?.playerCaptionsTracklistRenderer.captionTracks;
		this.captions.audio_tracks = vidObject.captions?.playerCaptionsTracklistRenderer.audioTracks;
		this.captions.languages = vidObject.captions?.playerCaptionsTracklistRenderer.translationLanguages;
	}

}


export default VideoInfo;
