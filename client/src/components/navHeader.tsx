import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
// import DateSelector from '../features/app/dateSelector';
// import SearchForm from '../features/app/searchForm';
import { Badge } from 'react-bootstrap';
import LogoImage from '../img/app.webp';
import { DEFAULTS } from '../init';
import { selectAppState, useAppSelector } from '../store';

// interface INavHeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const NavHeader = () => {
	const { streams } = useAppSelector(selectAppState);

	return (
		<Navbar bg="primary" variant="dark" expand="md" fixed="top">
			<Container fluid={DEFAULTS.fluid as any}>
				<Navbar.Brand href="./">
					<BrandImage src={LogoImage} className="d-inline-block me-2" />
					{DEFAULTS.pageTitle}
				</Navbar.Brand>
				<Navbar.Toggle area-controls="navbarSupportedContent" />
				<Navbar.Collapse id="navbarSupportedContent">
					<Navbar.Text className="ms-auto">
						Активних трансляцій:
						<Badge className="ms-1 bg-dark-glass">{streams.length}</Badge>
					</Navbar.Text>
					{/* <div className="secondary-light-text ms-auto">
						<TextIcon Icon={BsTools} className="icon-lg me-2">
							Сайт знаходиться в розробці
						</TextIcon>
					</div> */}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavHeader;

const BrandImage = styled.img`
	width: 40px;
	height: 40px;
	margin: -20px 0;
`;
