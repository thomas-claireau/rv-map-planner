import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Helpers from '../../utils/Helpers';
import Autocomplete from '../Autocomplete/Autocomplete';
import { useMapContext } from '../MapProvider';
import style from './Sidebar.module.scss';

export default function Sidebar({ handleDrag }) {
	const { map, locations } = useMapContext();

	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');
	const [predictions, setPredictions] = useState([]);
	const autocompleteService = new google.maps.places.AutocompleteService();

	// fire places search with timeout
	useEffect(() => {
		if (text.length > 3) {
			const timeout = setTimeout(() => {
				autocompleteService.getPlacePredictions(
					{
						input: text,
						types: ['(regions)'],
					},
					handlePredictions
				);
			}, 1500);

			return () => clearTimeout(timeout);
		}

		if (text.length <= 3 && predictions.length) setPredictions([]);
	}, [text]);

	// load places predictions
	function handlePredictions(predictions, status) {
		if (status != google.maps.places.PlacesServiceStatus.OK) {
			setPredictions([]);
			return;
		}
		setPredictions(predictions);
	}

	// reorder marker
	function handleDragEnd({ source, destination }) {
		const reOrderLocations = Helpers.moveInArray(
			locations,
			source?.index,
			destination?.index
		);

		handleDrag(reOrderLocations);
	}

	return (
		<aside className={style['sidebar']}>
			<Autocomplete
				text={text}
				setText={setText}
				predictions={predictions}
			/>
			{typeof window !== undefined && (
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="locations">
						{(provided) => {
							return (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
								>
									{locations.map((location, index) => {
										return (
											<Draggable
												key={index}
												draggableId={index.toString()}
												index={index}
											>
												{(provided) => {
													return (
														<li
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															{location.address}
														</li>
													);
												}}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				</DragDropContext>
			)}
		</aside>
	);
}

Sidebar.propTypes = {
	handleDrag: PropTypes.func,
};
