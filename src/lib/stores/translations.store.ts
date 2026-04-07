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
import { it } from '../i18n/it';
import { ru } from '../i18n/ru';

type Translations = typeof en | typeof pt | typeof de | typeof es | typeof fr | typeof it | typeof ru;

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
		case 'it':
			return it;
		case 'ru':
			return ru;
		default:
			return pt;
	}
});
