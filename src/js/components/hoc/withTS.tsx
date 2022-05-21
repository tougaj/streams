import React from 'react';

export interface IWithTS {
	ts: number;
}

export const WithTS =
	<T extends IWithTS>(WrappedComponent: React.ComponentType<T>) =>
	(props: Omit<T, 'ts'>) =>
		<WrappedComponent {...(props as T)} ts={new Date().valueOf()} />;
