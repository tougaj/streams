// import { promiseTimeOut } from './utils';

/**
 * `scrollWindowToTop` is a function that scrolls the window to the top of the page
 * @param {'auto' | 'smooth'} [behavior=auto] - 'auto' | 'smooth' = 'auto'
 */
export const scrollWindowToTop = (behavior: 'auto' | 'smooth' = 'smooth') =>
	window.scrollTo({
		top: 0,
		behavior,
	});

// export const scrollWindowToBottom = (behavior: 'auto' | 'smooth' = 'auto') =>
// 	window.scrollTo({
// 		top: 10000,
// 		behavior,
// 	});

// // export const moveControlToScreenCenter = async (control?: Element | null, highlight: boolean = false) => {
// export const moveControlToScreenCenter = async (control?: Element | null) => {
// 	if (!control) return;
// 	control.scrollIntoView({ behavior: 'smooth', block: 'center' });
// 	// if (!highlight) return;
// 	// highlightControl(control);
// };

// export const highlightControl = async (control?: Element | null, timeout?: number) => {
// 	if (!control) return;
// 	if (timeout) await promiseTimeOut(timeout);
// 	control.classList.add('animation-highlighted');
// 	await promiseTimeOut(500);
// 	control.classList.remove('animation-highlighted');
// };
