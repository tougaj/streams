import { createSlice } from '@reduxjs/toolkit';

export interface IAppSlice {
	userId: string;
}
const initialState: IAppSlice = {
	userId: '0',
};
export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		// changeYoutubeData: (state, action: PayloadAction<IYoutubeData>) => {
		// 	state.youtubeData = action.payload;
		// 	state.playedSeconds = action.payload.time;
		// },
		// changeYoutubeId: (state, action: PayloadAction<string | TStringWithUndefined>) => {
		// 	state.youtubeData.id = action.payload;
		// 	state.youtubeData.time = 0;
		// 	state.playedSeconds = 0;
		// },
		// changeYoutubeTime: (state, action: PayloadAction<number>) => {
		// 	state.youtubeData.time = action.payload;
		// 	state.playedSeconds = action.payload;
		// },
		// changePlayedSeconds: (state, action: PayloadAction<number>) => {
		// 	state.playedSeconds = action.payload;
		// },
	},
});

// export const { changeYoutubeData, changeYoutubeId, changeYoutubeTime, changePlayedSeconds } = appSlice.actions;

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
