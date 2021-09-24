export function addMarker(map, latLng, index) {
	new google.maps.Marker({
		position: new google.maps.LatLng(latLng),
		map,
		label: {
			fontWeight: '600',
			text: index.toString(),
		},
	});
}

export async function getAddressFromLocation(location) {
	const geocoder = new google.maps.Geocoder();

	const typesNotAllowed = ['natural_feature']; // detect ocean

	try {
		const res = await geocoder.geocode({ location });
		const result = res?.results[0];

		if (result['types'].some((r) => typesNotAllowed.includes(r)))
			return false;

		return result.formatted_address;
	} catch (error) {
		console.error(error);

		return false;
	}
}

export function moveInArray(arr, from, to) {
	// Make sure a valid array is provided
	if (Object.prototype.toString.call(arr) !== '[object Array]') {
		throw new Error('Please provide a valid array');
	}

	// Delete the item from it's current position
	var item = arr.splice(from, 1);

	// Make sure there's an item to move
	if (!item.length) {
		throw new Error('There is no item in the array at index ' + from);
	}

	// Move the item to its new position
	arr.splice(to, 0, item[0]);

	return arr;
}

export function drawLineBetweenMarker(map, locations) {
	const latLngs = locations.map(
		(location) => new google.maps.LatLng(location.lat, location.lng)
	);

	const line = new google.maps.Polyline({
		path: latLngs,
		geodesic: true,
		strokeColor: '#4986E7',
	});

	line.setMap(map);
}
