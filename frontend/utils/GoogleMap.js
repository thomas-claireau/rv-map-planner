export default class GoogleMap {
	static addMarker(map, latLng, index) {
		new google.maps.Marker({
			position: new google.maps.LatLng(latLng),
			map,
			label: {
				fontWeight: '600',
				text: index.toString(),
			},
		});
	}

	static async getAddress(location) {
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

	static drawLine(map, locations) {
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
}