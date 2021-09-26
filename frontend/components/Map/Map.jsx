import { useEffect, useRef, useState } from 'react';
import GoogleMap from '../../utils/GoogleMap';
import LocalStorage from '../../utils/LocalStorage';
import { MapProvider } from '../MapProvider';
import Sidebar from '../Sidebar/Sidebar';
import style from './Map.module.scss';

export default function Map({ google }) {
	const [state, setState] = useState(null);
	const [lines, setLines] = useState(null);
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

	console.log(google);

	useEffect(() => {
		if (mapDivRef && google) {
			const map = new google.maps.Map(mapDivRef.current, options);

			setState({ map });

			// interactive zoom and center map
			map.addListener('idle', () => {
				let center = map.getCenter();
				center = { lat: center?.lat(), lng: center?.lng() };

				const zoom = map.getZoom();

				localStorage.setItem('zoom', zoom);
				localStorage.setItem('center', JSON.stringify(center));
			});
		}
	}, [google, mapDivRef]);

	useEffect(() => {
		if (google) {
			setLines(GoogleMap.drawLines(state?.map, locations, lines));

			localStorage.setItem('locations', JSON.stringify(locations));

			if (locations.length) {
				locations.forEach(({ lat, lng }, index) => {
					GoogleMap.addMarker(state?.map, { lat, lng }, index + 1);
				});
			}
		}
	}, [google, locations, state]);

	function handleDrag(locations) {
		setLocations(() => [...locations]);
	}

	return (
		<MapProvider
			className={style['map-container']}
			value={{ map: state?.map, locations, setLocations }}
		>
			{state?.map && <Sidebar handleDrag={handleDrag} />}
			<div className={style['map']} ref={mapDivRef} />
		</MapProvider>
	);
}
