import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import CompanyImage from '../img/brand.webp';
import { DEFAULTS } from '../init';

// interface INavFooterProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const NavFooter = () => {
	return (
		<nav className="navbar navbar-dark bg-dark mt-auto">
			<Container fluid={DEFAULTS.fluid as any}>
				<div className="d-flex align-items-center">
					<a className="navbar-brand" href="/">
						<BrandImage alt="Brand" src={CompanyImage} />
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
