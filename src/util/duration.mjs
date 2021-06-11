// Express time durations in different formats


// Make sure the value is a number
function validate_number(value) {
	if(typeof value !== 'number') throw new TypeError("Expected number, got " + (typeof value));
}


class Duration {

	// Time duration measured in seconds
	#duration = 0;


	// Create a Duration instance

	static copy(duration) {
		if(!(duration instanceof Duration)) throw new TypeError(duration + " is not a valid Duration");

		let copied = new Duration();
		copied.#duration = duration.#duration;
		return copied;
	}

	static seconds(value) {
		validate_number(value);

		let duration = new Duration();
		duration.#duration = value;
		return duration;
	}

	static minutes(value) {
		validate_number(value);

		let duration = new Duration();
		duration.#duration = value * 60;
		return duration;
	}

	static hours(value) {
		validate_number(value);

		let duration = new Duration();
		duration.#duration = value * 3600;
		return duration;
	}

	static days(value) {
		validate_number(value);

		let duration = new Duration();
		duration.#duration = value * 86400;
		return duration;
	}

	static years(value) {
		validate_number(value);

		let duration = new Duration();
		duration.#duration = value * 31536000;
		return duration;
	}


	// Get a duration in a provided format

	as_seconds() { return this.#duration; }
	as_minutes() { return this.#duration / 60; }
	as_hours() { return this.#duration / 3600; }
	as_days() { return this.#duration / 86400; }
	as_years() { return this.#duration / 31536000; }

}


export default Duration;
