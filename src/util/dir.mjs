// Get the equivalent to __dirname for a module

export default function(path) {
	path = path.replaceAll(/\\/g, '/');

	let result = path.slice(0, path.lastIndexOf('/'));
	if(result.startsWith('file:///')) result = result.slice(8);

	if(process.platform.toLowerCase() !== 'win32')
		result = '/' + result;

	return result;
}
