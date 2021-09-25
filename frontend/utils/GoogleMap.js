export default class GoogleMap {
	static addMarker(map, latLng, index) {
		const marker = new google.maps.Marker({
			latLng,
			position: new google.maps.LatLng(latLng),
			map,
			label: {
				fontWeight: '600',
				text: index.toString(),
			},
		});

		return marker;
	}

	static drawLines(map, locations, oldLines) {
		// clear oldLines
		if (oldLines) oldLines.setMap(null);

		const latLngs = locations.map(
			(location) => new google.maps.LatLng(location.lat, location.lng)
		);

		const lines = new google.maps.Polyline({
			path: latLngs,
			geodesic: true,
			strokeColor: '#4986E7',
		});

		lines.setMap(map);

		return lines;
	}
}
