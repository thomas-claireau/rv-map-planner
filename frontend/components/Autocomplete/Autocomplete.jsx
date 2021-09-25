import PropTypes from 'prop-types';
import Helpers from '../../utils/Helpers';
import { useMapContext } from '../MapProvider';

export default function Autocomplete({ text, setText, predictions }) {
	const { setLocations } = useMapContext();

	async function handleClick(event) {
		const geocoder = new google.maps.Geocoder();
		const placeId = event.currentTarget.dataset.id;

		const res = await geocoder.geocode({ placeId });
		const result = res?.results[0];
		const location = result?.geometry.location;

		setLocations((locations) => {
			const item = {
				lat: location?.lat(),
				lng: location?.lng(),
				address: result?.formatted_address,
			};

			// check if location already exist
			if (locations.some((location) => Helpers.deepEqual(location, item)))
				return locations;

			return [...locations, item];
		});

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
};
