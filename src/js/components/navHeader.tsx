import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
// import DateSelector from '../features/app/dateSelector';
// import SearchForm from '../features/app/searchForm';
import { DEFAULTS } from '../init';

interface INavHeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const NavHeader = ({}: INavHeaderProps) => {
	return (
		<Navbar bg="primary" variant="dark" expand="md" fixed="top">
			<Container fluid={DEFAULTS.fluid as any}>
				<Navbar.Brand href="./">
					<BrandImage
						src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/feather_1fab6.png"
						className="d-inline-block me-2"
					/>
					{DEFAULTS.pageTitle}
				</Navbar.Brand>
				<Navbar.Toggle area-controls="navbarSupportedContent" />
				<Navbar.Collapse id="navbarSupportedContent">
					<div className="">Lorem ipsum dolor sit amet.</div>
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
