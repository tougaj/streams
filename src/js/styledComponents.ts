import styled from 'styled-components';

interface IStickyDivProps {
	top?: string;
	height?: string;
	zIndex?: number;
	bg?: string;
}
export const StickyDiv = styled.div<IStickyDivProps>`
	height: ${(props) => props.height || 'unset'};
	position: sticky;
	top: ${(props) => props.top || '56px'};
	z-index: ${(props) => props.zIndex || 1};
	background-color: ${(props) => props.bg || '#fefbfa'};
`;
