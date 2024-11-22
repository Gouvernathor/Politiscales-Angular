import languageIds from '../assets/langages.json';
import rawQuestions from '../assets/questions.json';
import { Question } from '../datamodel/questionsConfiguration';
import { getQuestions } from '../services/questionsConfigurationService';

export { languageIds };
const translations: Readonly<Record<string, Readonly<Record<string, string>>>> = Object.fromEntries(
    languageIds.map((languageId) => (
        [languageId, require(`../assets/languages/${languageId}.json`)]
)));
let currentLanguage: string|null = null;
/**
 * When used with no parameter, returns the current selected language.
 * If none is selected, performs the rest of the calculations based
 * on navigator.languages (when available, which is not the case in SSR).
 *
 * Otherwise, tries to match the input string with any of the existing languages.
 * If none match, the first of the languages in languages.json is returned.
 */
export function getLanguageOrDefault(lang?: string) {
    if (lang === undefined) {
        if (currentLanguage !== null) {
            return currentLanguage;
        }
        // this protection is for SSR, window doesn't exist there
        if (globalThis.window) {
            lang = globalThis.window?.navigator.languages.filter(l => languageIds.includes(l))[0]
                || globalThis.window.navigator.language;
        }
    }
    if (lang !== undefined) {
        lang = lang.replace("-", "_");
        for (const languageId of languageIds) {
            if (languageId.startsWith(lang)) {
                return languageId;
            }
        }
    }
    return languageIds[0];
}
export function setLanguage(lang: string) {
    currentLanguage = getLanguageOrDefault(lang);
}
/**
 * Gets a localized string to display to the user.
 * @param lineId the id of the localized string
 * @param lang the language to use, defaulting to the current one
 * @returns the localized string
 */
export function getLine(lineId: string, lang?: string) {
    if (lang === undefined) {
        lang = getLanguageOrDefault();
    }
    return translations[lang][lineId] ?? `{{${lineId} : ${lang}}}`;
}


export const questions: Readonly<Question[]> = getQuestions(rawQuestions);
