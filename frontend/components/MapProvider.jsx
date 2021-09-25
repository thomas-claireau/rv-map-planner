import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';

const MapContext = createContext();

export function MapProvider(props) {
	const { value, children, className } = props;

	return (
		<MapContext.Provider value={value}>
			<div className={className}>{children}</div>
		</MapContext.Provider>
	);
}

export function useMapContext() {
	return useContext(MapContext);
}

MapProvider.propTypes = {
	props: PropTypes.object,
};
