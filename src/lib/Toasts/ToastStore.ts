import { writable } from 'svelte/store';
import type { Toast } from './Toast';

export const toasts = writable<Toast[]>([]);

let lastId = 100;

export function addToast(message: string, timeout = 2500) {
	lastId++;
	const t: Toast = { message, id: lastId };

	toasts.update((v) => {
		setTimeout(() => {
			//Remove the thing
			toasts.update((v) => v.filter((v) => v.id !== t.id));
		}, timeout);
		return [...v, t];
	});
}
