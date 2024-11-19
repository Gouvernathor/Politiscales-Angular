import languageIds from '../assets/langages.json';
import rawQuestions from '../assets/questions.json';
import { Question } from './datamodel/questionsConfiguration';
import { getQuestions } from './services/configurationService';

export {languageIds};
const translations: Readonly<Record<string, Readonly<Record<string, string>>>> = Object.fromEntries(await Promise.all(
    languageIds.map(async (languageId) => (
        [languageId, await import(`../assets/languages/${languageId}.json`)]
))));
function getLanguageOrDefault(lang: string, def?: string) {
    lang = lang.replace("-", "_");
    for (const languageId of languageIds) {
        if (languageId.startsWith(lang)) {
            return languageId;
        }
    }
    if (def && languageIds.includes(def)) {
        return def;
    }
    return languageIds[0];
}
let currentLanguage: string = getLanguageOrDefault(navigator?.language);
export function setLanguage(lang: string) {
    currentLanguage = getLanguageOrDefault(lang);
}
export function getLine(lineId: string, lang?: string) {
    if (lang === undefined) {
        lang = currentLanguage;
    }
    return translations[lang][lineId];
}


export const questions: Readonly<Question[]> = getQuestions(rawQuestions);
