import PropTypes from 'prop-types';
import CommentCount from '../CommentCount/CommentCount';
import Like from '../Like/Like';
import style from './SocialProof.module.scss';

export default function SocialProof({ direction, onClick }) {
	return (
		<div className={`${style['social-proof']} ${style[direction]}`}>
			<Like direction={direction} onClick={onClick} />
			<CommentCount direction={direction} onClick={onClick} />
		</div>
	);
}

SocialProof.propTypes = {
	direction: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
