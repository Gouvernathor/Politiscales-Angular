import languageIds from '../assets/langages.json';
import rawQuestions from '../assets/questions.json';
import { Question } from './datamodel/questionsConfiguration';
import { getQuestions } from './services/configurationService';

export const translations: Readonly<Record<string, Readonly<Record<string, string>>>> = Object.fromEntries(await Promise.all(
    languageIds.map(async (languageId) => (
        [languageId, await import(`../assets/languages/${languageId}.json`)]
))));

export const questions: Question[] = getQuestions(rawQuestions);
