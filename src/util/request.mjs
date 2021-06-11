// Request YouTube urls

import https from "https";


async function promise_request(url, method, options={}) {
	if(typeof method !== 'string') throw new TypeError("Invalid method: " + method);

	options.redirects = options.redirects ?? 10;
	options.waitForBody = options.waitForBody ?? true;

	return new Promise((resolve, reject) => {
		const send_opts = { method };
		if(options.headers) send_opts.headers = options.headers;

		const request = https.request(url, send_opts, async (res) => {
			if(res.statusCode === 301 || res.statusCode === 302) {
				if(options.redirects <= 0) return reject("Too many redirects");
				
				options.redirects--;
				return resolve(await promise_request(res.headers.location, 'GET', options));
			}

			if(res.statusCode !== 200) {
				return reject(res.statusCode, res);
			}

			if(!options.waitForBody) resolve({ response: res });
			else {
				let body = "";
				res.setEncoding('utf8');

				res.on('data', (chunk) => { body += chunk; });
				res.on('end', () => { resolve({ response: res, body }); });
				res.on('error', (err) => { reject(err); });
			}
		});

		if(options.body) request.write(options.body);
		request.end();
	});
}


export default {

	// Generic https GET
	get(url, headers, body=null) {
		return promise_request(url, 'GET', { headers, body });
	},


	// Generic https POST
	post(url, headers, body=null) {
		return promise_request(url, 'POST', { headers, body });
	},


	// GET a video page from the full url or just an id
	get_video_page(id) {
		if(id.includes('?v=')) id = id.slice(id.indexOf('?v=') + 3);
		return promise_request(`https://www.youtube.com/watch?v=${id}`, 'GET');
	},


	// GET an embed page from the full url or just an id
	get_embed_page(id) {
		if(id.includes('/embed/')) id = id.slice(id.indexOf('/embed/') + 7);
		return promise_request(`https://www.youtube.com/embed/${id}`, 'GET');
	},


	// GET a playlist page from the full url or just an id
	get_playlist_page(id) {
		if(id.includes('?list=')) id = id.slice(id.indexOf('?list=') + 6);
		return promise_request(`https://www.youtube.com/playlist?list=${id}`, 'GET');
	}

};
