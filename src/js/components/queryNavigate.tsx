import React from 'react';
import { Navigate, NavigateProps, useLocation } from 'react-router-dom';

interface IQueryNavigateProps extends NavigateProps {}
const QueryNavigate = ({ to, ...props }: IQueryNavigateProps) => {
	const location = useLocation();
	return <Navigate to={to + location.search} replace {...props} />;
};

export default QueryNavigate;
