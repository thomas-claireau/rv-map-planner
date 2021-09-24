import { useEffect, useRef, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {
	addMarker,
	drawLineBetweenMarker,
	getAddressFromLocation,
} from './helpers';
import style from './Map.module.scss';

export default function Map() {
	const [state, setState] = useState(null);

	const [locations, setLocations] = useState(
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('locations')) || []
			: []
	);

	const mapDivRef = useRef(null);

	const options = {
		center: { lat: 44.2072716, lng: 12.5271884 },
		zoom: 3,
		clickable: true,
	};

	useEffect(() => {
		const map = new window.google.maps.Map(mapDivRef.current, options);
		setState({ map });

		// interaction click on the map
		map.addListener('click', async (event) => {
			const address = await getAddressFromLocation(event.latLng);

			if (!address) return;

			setLocations((locations) => [
				...locations,
				{
					lat: event.latLng.lat(),
					lng: event.latLng.lng(),
					address,
				},
			]);
		});

		// add existents locations to the map
		locations?.forEach((location, index) => {
			addMarker(map, location, index + 1);
		});
	}, [mapDivRef]);

	useEffect(() => {
		drawLineBetweenMarker(state?.map, locations);

		localStorage.setItem('locations', JSON.stringify(locations));
	}, [locations, state]);

	useEffect(() => {
		const length = Number(locations.length);
		const lastLocation = locations[length - 1];

		addMarker(
			state?.map,
			{ lat: lastLocation?.lat, lng: lastLocation?.lng },
			length
		);
	}, [locations]);

	return (
		<div className={style['map-container']}>
			{state?.map && (
				<Sidebar
					map={state?.map}
					locations={locations}
					handleDrag={(locations) => setLocations(() => [...locations])}
				/>
			)}
			<div className={style['map']} ref={mapDivRef} />
		</div>
	);
}
