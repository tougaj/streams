import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { DEFAULTS } from '../init';

interface INavFooterProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const NavFooter = ({}: INavFooterProps) => {
	return (
		<nav className="navbar navbar-dark bg-dark mt-auto">
			<Container fluid={DEFAULTS.fluid as any}>
				<div className="d-flex align-items-center">
					<a className="navbar-brand" href="/">
						<BrandImage
							alt="Brand"
							src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/320/jack-o-lantern_1f383.png"
						/>
					</a>
					<span className="navbar-text">
						Фундація стратегічного моніторингу
						<br />
						загальних процесів
					</span>
				</div>
			</Container>
		</nav>
	);
};

const BrandImage = styled.img`
	width: 50px;
	height: 50px;
	margin-top: -4px;
`;

export default NavFooter;
