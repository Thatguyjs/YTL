import { Cipher, CipherLoader } from "./cipher/export.mjs";
import { StreamInfo, StreamFilter, itags, StreamLoader } from "./stream/export.mjs";

import { VideoInfo, VideoLoader } from "./video/export.mjs";
import { PlaylistInfo, PlaylistLoader } from "./playlist/export.mjs";

import Duration from "./util/duration.mjs";
import request from "./util/request.mjs";
import downloader from "./util/download.mjs";


export {
	Cipher, CipherLoader,
	StreamInfo, StreamFilter, itags, StreamLoader,

	VideoInfo, VideoLoader,
	PlaylistInfo, PlaylistLoader,

	Duration,
	request,
	downloader
};


// Make sure the `/cipher/cache` folder exists

import fs from "fs";
import get_dir from "./util/dir.mjs";

const dirname = get_dir(import.meta.url);

if(!fs.existsSync(dirname + '/cipher/cache')) {
	fs.mkdirSync(dirname + '/cipher/cache');
}
