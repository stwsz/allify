// Svelte
import { writable, type Writable } from 'svelte/store';

export const showAddTickets: Writable<Boolean> = writable(false);
