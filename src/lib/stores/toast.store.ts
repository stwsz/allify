// Svelte
import { writable, type Writable } from 'svelte/store';

export const toast: Writable<{
	showToast: boolean;
	toastType: string | undefined;
	toastMessage: string | undefined;
}> = writable({ showToast: false, toastType: undefined, toastMessage: undefined });
