/*
	Adapted from:
	 - https://github.com/pytube/pytube/blob/master/pytube/itags.py
	 - https://gist.github.com/sidneys/7095afe4da4ae58694d128b1034e01e2
*/


class FormatCode {

	itag = 0;
	resolution = null;
	bitrate = null;
	format = "";

	constructor(itag, res, bitrate, format="") {
		this.itag = itag;
		this.resolution = res;
		this.bitrate = bitrate;
		this.format = format;
	}

}


export default {
	FormatCode,

	PROGRESSIVE_VIDEO: {
		5: new FormatCode(5, "240p", "64kbps", "FLV"),
	    6: new FormatCode(6, "270p", "64kbps", "FLV"),
	    13: new FormatCode(13, "144p", null),
	    17: new FormatCode(17, "144p", "24kbps", "3GP"),
	    18: new FormatCode(18, "360p", "96kbps", "MP4"),
	    22: new FormatCode(22, "720p", "192kbps", "MP4"),
	    34: new FormatCode(34, "360p", "128kbps", "FLV"),
	    35: new FormatCode(35, "480p", "128kbps", "FLV"),
	    36: new FormatCode(36, "240p", null, "3GP"),
	    37: new FormatCode(37, "1080p", "192kbps", "MP4"),
	    38: new FormatCode(38, "3072p", "192kbps", "MP4"),
	    43: new FormatCode(43, "360p", "128kbps", "WEBM"),
	    44: new FormatCode(44, "480p", "128kbps", "WEBM"),
	    45: new FormatCode(45, "720p", "192kbps", "WEBM"),
	    46: new FormatCode(46, "1080p", "192kbps", "WEBM"),
	    59: new FormatCode(59, "480p", "128kbps"),
	    78: new FormatCode(78, "480p", "128kbps"),
	    82: new FormatCode(82, "360p", "128kbps", "MP4"),
	    83: new FormatCode(83, "480p", "128kbps", "MP4"),
	    84: new FormatCode(84, "720p", "192kbps", "MP4"),
	    85: new FormatCode(85, "1080p", "192kbps", "MP4"),
	    91: new FormatCode(91, "144p", "48kbps"),
	    92: new FormatCode(92, "240p", "48kbps", "HLS"),
	    93: new FormatCode(93, "360p", "128kbps", "HLS"),
	    94: new FormatCode(94, "480p", "128kbps", "HLS"),
	    95: new FormatCode(95, "720p", "256kbps", "HLS"),
	    96: new FormatCode(96, "1080p", "256kbps", "HLS"),
	    100: new FormatCode(100, "360p", "128kbps", "WEBM"),
	    101: new FormatCode(101, "480p", "192kbps", "WEBM"),
	    102: new FormatCode(102, "720p", "192kbps", "WEBM"),
	    132: new FormatCode(132, "240p", "48kbps", "HLS"),
	    151: new FormatCode(151, "720p", "24kbps", "HLS"),
	    300: new FormatCode(300, "720p", "128kbps"),
	    301: new FormatCode(301, "1080p", "128kbps")
	},

	DASH_VIDEO: {
		133: new FormatCode(133, "240p", null, "MP4"),
		134: new FormatCode(134, "360p", null, "MP4"),
		135: new FormatCode(135, "480p", null, "MP4"),
		136: new FormatCode(136, "720p", null, "MP4"),
		137: new FormatCode(137, "1080p", null, "MP4"),
		138: new FormatCode(138, "2160p", null, "MP4"),
		160: new FormatCode(160, "144p", null, "MP4"),
		167: new FormatCode(167, "360p", null, "WEBM"),
		168: new FormatCode(168, "480p", null, "WEBM"),
		169: new FormatCode(169, "720p", null, "WEBM"),
		170: new FormatCode(170, "1080p", null, "WEBM"),
		212: new FormatCode(212, "480p", null, "MP4"),
		218: new FormatCode(218, "480p", null, "WEBM"),
		219: new FormatCode(219, "480p", null, "WEBM"),
		242: new FormatCode(242, "240p", null, "WEBM"),
		243: new FormatCode(243, "360p", null, "WEBM"),
		244: new FormatCode(244, "480p", null, "WEBM"),
		245: new FormatCode(245, "480p", null, "WEBM"),
		246: new FormatCode(246, "480p", null, "WEBM"),
		247: new FormatCode(247, "720p", null, "WEBM"),
		248: new FormatCode(248, "1080p", null, "WEBM"),
		264: new FormatCode(264, "1440p", null, "MP4"),
		266: new FormatCode(266, "2160p", null, "MP4"),
		271: new FormatCode(271, "1440p", null, "WEBM"),
		272: new FormatCode(272, "4320p", null, "WEBM"),
		278: new FormatCode(278, "144p", null, "WEBM"),
		298: new FormatCode(298, "720p", null, "MP4"),
		299: new FormatCode(299, "1080p", null, "MP4"),
		302: new FormatCode(302, "720p", null, "WEBM"),
		303: new FormatCode(303, "1080p", null, "WEBM"),
		308: new FormatCode(308, "1440p", null, "WEBM"),
		313: new FormatCode(313, "2160p", null, "WEBM"),
		315: new FormatCode(315, "2160p", null, "WEBM"),
		330: new FormatCode(330, "144p", null, "WEBM"),
		331: new FormatCode(331, "240p", null, "WEBM"),
		332: new FormatCode(332, "360p", null, "WEBM"),
		333: new FormatCode(333, "480p", null, "WEBM"),
		334: new FormatCode(334, "720p", null, "WEBM"),
		335: new FormatCode(335, "1080p", null, "WEBM"),
		336: new FormatCode(336, "1440p", null, "WEBM"),
		337: new FormatCode(337, "2160p", null, "WEBM"),
		394: new FormatCode(394, "144p", null, "MP4"),
		395: new FormatCode(395, "240p", null, "MP4"),
		396: new FormatCode(396, "360p", null, "MP4"),
		397: new FormatCode(397, "480p", null, "MP4"),
		398: new FormatCode(398, "720p", null, "MP4"),
		399: new FormatCode(399, "1080p", null, "MP4"),
		400: new FormatCode(400, "1440p", null, "MP4"),
		401: new FormatCode(401, "2160p", null, "MP4"),
		402: new FormatCode(402, "4320p", null, "MP4"),
		571: new FormatCode(571, "4320p", null, "MP4")
	},

	DASH_AUDIO: {
		139: new FormatCode(139, null, "48kbps", "MP4"),
		140: new FormatCode(140, null, "128kbps", "MP4"),
		141: new FormatCode(141, null, "256kbps", "MP4"),
		171: new FormatCode(171, null, "128kbps", "WEBM"),
		172: new FormatCode(172, null, "256kbps", "WEBM"),
		249: new FormatCode(249, null, "50kbps", "WEBM"),
		250: new FormatCode(250, null, "70kbps", "WEBM"),
		251: new FormatCode(251, null, "160kbps", "WEBM"),
		256: new FormatCode(256, null, "192kbps", "MP4"),
		258: new FormatCode(258, null, "384kbps", "MP4"),
		325: new FormatCode(325, null, null, "MP4"),
		328: new FormatCode(328, null, null, "MP4")
	}

};

