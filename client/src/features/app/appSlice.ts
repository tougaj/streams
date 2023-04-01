import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServerStreamItem, IStreamServerParams } from '../../init';

export interface IAppSlice {
	userId: string;
	streamServerParams?: IStreamServerParams;
	streams: IServerStreamItem[];
}
const initialState: IAppSlice = {
	userId: '0',
	streamServerParams: undefined,
	streams: [],
};
export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		changeStreams: (state, action: PayloadAction<IServerStreamItem[]>) => {
			state.streams = action.payload;
		},
		changeStreamServerParams: (state, action: PayloadAction<IStreamServerParams>) => {
			state.streamServerParams = action.payload;
		},
	},
});

export const { changeStreams, changeStreamServerParams } = appSlice.actions;

// export const onChangeSearchParam = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => (
// 	dispatch: AppDispatch
// ) => {
// 	dispatch(changeParams({ [event.target.name]: event.target.value }));
// };

// export const onSelectChangeSearchParam = (
// 	value: ValueType<ISelectOption, false>,
// 	actionMeta: ActionMeta<ISelectOption>
// ) => (dispatch: AppDispatch) => {
// 	const name = actionMeta.name as keyof ISearchParams;
// 	dispatch(changeParams({ [name]: value?.value || DEFAULT_SEARCH_PARAMS[name] }));
// };

export default appSlice.reducer;
