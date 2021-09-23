import { useEffect, useRef, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { addMarker, getAddressFromLocation } from './helpers';
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

	console.log(locations);

	useEffect(() => {
		const map = new window.google.maps.Map(mapDivRef.current, options);
		setState({ map });

		// interaction click on the map
		map.addListener('click', async (event) => {
			const address = await getAddressFromLocation(event.latLng);

			setLocations((locations) => [
				...locations,
				{
					lat: event.latLng.lat(),
					lng: event.latLng.lng(),
					address,
				},
			]);

			addMarker(map, event.latLng);
		});

		// add existents locations to the map
		locations?.forEach((location) => {
			addMarker(map, location);
		});
	}, [mapDivRef]);

	useEffect(
		() => localStorage.setItem('locations', JSON.stringify(locations)),
		[locations]
	);

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
