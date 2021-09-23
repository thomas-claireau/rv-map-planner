import PropTypes from 'prop-types';
import { useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import style from './Sidebar.module.scss';

export default function Sidebar({ map, locations }) {
	const inputRef = useRef(null);

	console.log(locations);

	function handleDragEnd({ source, destination }) {
		console.log(source?.index, destination?.index);
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
};
