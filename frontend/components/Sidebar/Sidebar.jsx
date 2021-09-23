import PropTypes from 'prop-types';
import { useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { moveInArray } from '../Map/helpers';
import style from './Sidebar.module.scss';

export default function Sidebar({ map, locations, handleDrag }) {
	const inputRef = useRef(null);

	function handleDragEnd({ source, destination }) {
		const reOrderLocations = moveInArray(
			locations,
			source?.index,
			destination?.index
		);

		handleDrag(reOrderLocations);
	}

	return (
		<aside className={style['sidebar']}>
			<input type="text" ref={inputRef} />
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
	map: PropTypes.object,
	locations: PropTypes.array,
	setLocations: PropTypes.func,
};
