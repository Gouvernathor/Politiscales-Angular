import { Routes } from '@angular/router';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { languageIds } from '../services/localizationService';
import { StartComponent } from './start/start.component';
import { QuizComponent } from './quiz/quiz.component';
import { HelpComponent } from './help/help.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
    // localized paths, each with children: empty, help, quiz, results
    // to related component with parameter set to the language id
    ...languageIds.map((languageId) => ({
        path: languageId,
        data: {lang: languageId},
        children: [
            {
                path: 'help',
                component: HelpComponent,
            },
            {
                path: 'quiz',
                component: QuizComponent,
            },
            {
                path: 'results',
                component: ResultsComponent,
            },
            {
                path: '',
                component: StartComponent,
            },
        ]
    })),

    // help (will improvize language based on navigator language)
    {
        path: 'help',
        component: HelpComponent,
    },
    // optional, results/quiz (will improvize language too)

    // empty (or optionally wildcard) for language selector
    {
        path: '',
        component: LanguageSelectorComponent,
    },
];
