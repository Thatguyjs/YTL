## class Duration
[src/util/duration.mjs](/src/util/duration.mjs)

#### static copy(duration: Duration)
Copies `duration` and returns the result.  
<b>Throws:</b> a `TypeError` if `duration` is not a `Duration` instance  
<b>Returns:</b> a `Duration` instance

#### static seconds(value: Number)
Creates a new `Duration` instance with `value` as seconds, and returns the result.  
<b>Throws:</b> a `TypeError` if `value` is not a `Number`  
<b>Returns:</b> a `Duration` instance

#### static minutes(value: Number)
Creates a new `Duration` instance with `value` as minutes, and returns the result.  
<b>Throws:</b> a `TypeError` if `value` is not a `Number`  
<b>Returns:</b> a `Duration` instance

#### static hours(value: Number)
Creates a new `Duration` instance with `value` as hours, and returns the result.  
<b>Throws:</b> a `TypeError` if `value` is not a `Number`  
<b>Returns:</b> a `Duration` instance

#### static days(value: Number)
Creates a new `Duration` instance with `value` as days, and returns the result.  
<b>Throws:</b> a `TypeError` if `value` is not a `Number`  
<b>Returns:</b> a `Duration` instance

#### static years(value: Number)
Creates a new `Duration` instance with `value` as years, and returns the result.  
<b>Throws:</b> a `TypeError` if `value` is not a `Number`  
<b>Returns:</b> a `Duration` instance

#### as_seconds()
Returns the duration's value in seconds.  
<b>Returns:</b> a `Number` representing the number of seconds in the `Duration` instance

#### as_minutes()
Returns the duration's value in minutes.  
<b>Returns:</b> a `Number` representing the number of minutes in the `Duration` instance

#### as_hours()
Returns the duration's value in hours.  
<b>Returns:</b> a `Number` representing the number of hours in the `Duration` instance

#### as_days()
Returns the duration's value in days.  
<b>Returns:</b> a `Number` representing the number of days in the `Duration` instance

#### as_years()
Returns the duration's value in years.  
<b>Returns:</b> a `Number` representing the number of years in the `Duration` instance
