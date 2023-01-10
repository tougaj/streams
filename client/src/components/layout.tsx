import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { DEFAULTS } from '../init';
import NavFooter from './navFooter';
import NavHeader from './navHeader';
import { TopScroller } from './topScroller';

// interface ILayoutProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const Layout = () => {
	return (
		<>
			<Helmet>
				<title>{DEFAULTS.pageTitle}</title>
			</Helmet>
			<NavHeader />
			<div className="container-fluid">
				<Outlet />
			</div>
			<NavFooter />
			<TopScroller />
		</>
	);
};

export default Layout;
