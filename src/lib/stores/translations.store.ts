// Svelte
import { derived, type Readable } from 'svelte/store';

// Stores
import { languageStore } from './language.store';

// Translations
import { en } from '../i18n/en';
import { pt } from '../i18n/pt';
import { de } from '../i18n/de';
import { es } from '../i18n/es';
import { fr } from '../i18n/fr';

type Translations = typeof en | typeof pt | typeof de | typeof es | typeof fr;

export const translationsStore: Readable<Translations> = derived(languageStore, ($language) => {
	switch ($language) {
		case 'pt':
			return pt;
		case 'en':
			return en;
		case 'de':
			return de;
		case 'es':
			return es;
		case 'fr':
			return fr;
		default:
			return pt;
	}
});
