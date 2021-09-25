import { useEffect, useRef, useState } from 'react';
import GoogleMap from '../../utils/GoogleMap';
import LocalStorage from '../../utils/LocalStorage';
import { MapProvider } from '../MapProvider';
import Sidebar from '../Sidebar/Sidebar';
import style from './Map.module.scss';

export default function Map() {
	const [state, setState] = useState(null);

	const [locations, setLocations] = useState(
		LocalStorage.get('locations', [])
	);

	const mapDivRef = useRef(null);

	const options = {
		center: LocalStorage.get('center', {
			lat: 44.2072716,
			lng: 12.5271884,
		}),
		zoom: LocalStorage.get('zoom', 3),
		clickable: true,
	};

	useEffect(() => {
		const map = new window.google.maps.Map(mapDivRef.current, options);

		setState({ map });

		// interactive zoom and center map
		map.addListener('idle', () => {
			let center = map.getCenter();
			center = { lat: center?.lat(), lng: center?.lng() };

			const zoom = map.getZoom();

			localStorage.setItem('zoom', zoom);
			localStorage.setItem('center', JSON.stringify(center));
		});

		// add existents locations to the map
		locations?.forEach((location, index) => {
			GoogleMap.addMarker(map, location, index + 1);
		});
	}, [mapDivRef]);

	useEffect(() => {
		GoogleMap.drawLine(state?.map, locations);

		localStorage.setItem('locations', JSON.stringify(locations));
	}, [locations, state]);

	useEffect(() => {
		if (locations.length) {
			const length = Number(locations.length);
			const lastLocation = locations[length - 1];

			// add marker on click
			GoogleMap.addMarker(
				state?.map,
				{ lat: lastLocation?.lat, lng: lastLocation?.lng },
				length
			);
		}
	}, [locations]);

	return (
		<MapProvider
			className={style['map-container']}
			value={{ map: state?.map, locations, setLocations }}
		>
			{state?.map && (
				<Sidebar
					map={state?.map}
					locations={locations}
					handleDrag={(locations) => setLocations(() => [...locations])}
				/>
			)}
			<div className={style['map']} ref={mapDivRef} />
		</MapProvider>
	);
}
