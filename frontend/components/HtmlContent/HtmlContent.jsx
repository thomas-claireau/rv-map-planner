import PropTypes from 'prop-types';
import style from './HtmlContent.module.scss';

export default function HtmlContent({
	tag = 'div',
	children,
	className,
	...props
}) {
	const Tag = tag;

	return (
		<Tag
			{...props}
			className={`html-content ${style['html-content']} ${className}`}
			dangerouslySetInnerHTML={{
				__html: children,
			}}
		/>
	);
}

HtmlContent.propTypes = {
	tag: PropTypes.string,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
