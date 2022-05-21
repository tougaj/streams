import React from 'react';
// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { scrollWindowToTop } from '../scrolls';
import Icon from './icon';

export const TopScroller = () => {
	// const { pathname } = useLocation();

	const onScrollToTopClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		scrollWindowToTop();
	};

	// useEffect(() => {
	// setTimeout(scrollWindowToTop, 100, 'auto');
	// }, [pathname]);

	return (
		<ScrollerContainer className="position-fixed">
			<ScrollerButton className="btn p-0" onClick={onScrollToTopClick}>
				<ScrollerIcon name="arrow-up-circle-fill" className="top-scroller__arrow" />
			</ScrollerButton>
		</ScrollerContainer>
	);
};

const ScrollerContainer = styled.div`
	right: 0.67em;
	bottom: 24px;
`;

const ScrollerButton = styled.button`
	line-height: 0;
	opacity: 0.5;
	transition: opacity 0.3s;
	&:hover {
		opacity: 1;
	}
`;

const ScrollerIcon = styled(Icon)`
	font-size: 32px;
	color: var(--bs-primary, blue);
`;
