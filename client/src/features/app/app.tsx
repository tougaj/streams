import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/layout';
import QueryNavigate from '../../components/queryNavigate';
import MainStream from '../streams/mainStream';
import Streams from '../streams/streams';

// interface IAppProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="stream" element={<Streams />}>
					<Route path=":streamId" element={<MainStream />} />
				</Route>
				<Route index element={<QueryNavigate to="stream" />} />
				<Route path="*" element={<QueryNavigate to="stream" />} />
			</Route>
		</Routes>
	);
};

export default App;
