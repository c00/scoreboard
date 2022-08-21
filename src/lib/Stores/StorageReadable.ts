import { browser } from '$app/env';
import { readable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function storageReadable(key: string, initial?: any) {
	return readable(initial, function start(set) {
		if (!browser) return;

		const gotten = localStorage.getItem(key);

		let data;
		try {
			data = JSON.parse(gotten);
		} catch (err) {
			//not parsable, no problem.
			data = gotten;
		}
		if (data) set(data);

		function handleEvent(event: StorageEvent) {
			if (event.key !== key) return;
			if (event.oldValue === event.newValue) return;

			let data;
			try {
				data = JSON.parse(event.newValue);
			} catch (err) {
				//not parsable, no problem.
				data = event.newValue;
			}
			set(data);
		}

		addEventListener('storage', handleEvent);

		return () => {
			removeEventListener('storage', handleEvent);
		};
	});
}
