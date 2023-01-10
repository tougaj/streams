import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
// import DateSelector from '../features/app/dateSelector';
// import SearchForm from '../features/app/searchForm';
import { BsTools } from 'react-icons/bs';
import LogoImage from '../img/app.webp';
import { DEFAULTS } from '../init';
import TextIcon from './textIcon';

// interface INavHeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const NavHeader = () => {
	return (
		<Navbar bg="primary" variant="dark" expand="md" fixed="top">
			<Container fluid={DEFAULTS.fluid as any}>
				<Navbar.Brand href="./">
					<BrandImage src={LogoImage} className="d-inline-block me-2" />
					{DEFAULTS.pageTitle}
				</Navbar.Brand>
				<Navbar.Toggle area-controls="navbarSupportedContent" />
				<Navbar.Collapse id="navbarSupportedContent">
					<div className="secondary-light-text ms-auto">
						<TextIcon Icon={BsTools} className="icon-lg me-2">
							Сайт знаходиться в розробці
						</TextIcon>
					</div>
					{/* <SearchForm /> */}
					{/* <DateSelector className="ms-auto" /> */}
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
