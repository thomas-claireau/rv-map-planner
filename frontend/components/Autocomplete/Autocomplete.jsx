import PropTypes from 'prop-types';
import GoogleMap from '../../utils/GoogleMap';

export default function Autocomplete({
	map,
	text,
	setText,
	predictions,
	locations,
}) {
	async function handleClick(event) {
		const geocoder = new google.maps.Geocoder();
		const placeId = event.currentTarget.dataset.id;

		const res = await geocoder.geocode({ placeId });
		const location = res.results[0].geometry.location;

		GoogleMap.addMarker(
			map,
			{ lat: location.lat(), lng: location.lng() },
			locations.length + 1
		);

		setText('');
	}

	return (
		<div>
			<input
				type="text"
				value={text}
				onChange={(event) => setText(event.currentTarget.value)}
			/>
			{predictions.length
				? predictions.map((prediction, index) => (
						<li
							key={index}
							data-id={prediction.place_id}
							onClick={handleClick}
						>
							{prediction.description}
						</li>
				  ))
				: null}
		</div>
	);
}

Autocomplete.propTypes = {
	text: PropTypes.string,
	setText: PropTypes.func,
	predictions: PropTypes.array,
	locations: PropTypes.array,
};
