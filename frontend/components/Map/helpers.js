export function addMarker(map, latLng) {
	new google.maps.Marker({
		position: latLng,
		map,
	});
}

export async function getAddressFromLocation(location) {
	const geocoder = new google.maps.Geocoder();

	try {
		const res = await geocoder.geocode({ location });
		return res?.results[0].formatted_address;
	} catch (error) {
		console.error(error);

		return;
	}
}
