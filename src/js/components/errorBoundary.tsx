import * as React from 'react';
import styled from 'styled-components';

const ErrorPanel = styled.div`
	/* transform: translateY(-32px); */
	text-shadow: 0 1px 1px #fff;
`;
const ErrorInfo = styled.div`
	white-space: pre-wrap;
`;
const BoldDiv = styled.div`
	font-weight: 700;
`;

interface IErrorBoundaryProps {
	children: JSX.Element;
}
interface IErrorBoundaryState {
	error: any;
	errorInfo: any;
}

export default class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = {
			error: null,
			errorInfo: null,
		};
	}

	componentDidCatch(error: any, errorInfo: any) {
		this.setState({ error, errorInfo });
	}

	render() {
		const { error, errorInfo } = this.state;
		if (!errorInfo) return this.props.children;
		return (
			<ErrorPanel className="alert alert-danger m-auto">
				<BoldDiv>{'\u{1f914}'} Щось пішло не так</BoldDiv>
				<div>Адреса: {location.href}</div>
				<div>${error && error.toString()}</div>
				<ErrorInfo>{errorInfo.componentStack}</ErrorInfo>
				<BoldDiv>&#x26a0;&#xfe0f; Будь ласка, обов’язково повідомте про дану помилку розробника!</BoldDiv>
			</ErrorPanel>
		);
	}
}
