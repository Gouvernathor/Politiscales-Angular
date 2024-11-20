import { Routes } from '@angular/router';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { languageIds } from '../unsorted/configuration';
import { StartComponent } from './start/start.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    // localized paths, each with children: empty, help, quiz, results
    // to related component with parameter set to the language id
    ...languageIds.map((languageId) => ({
        path: languageId,
        data: {lang: languageId}, // TODO: check that it works
        children: [
            // {
            //     path: 'help',
            //     component: HelpComponent,
            // },
            {
                path: 'quiz',
                component: QuizComponent,
            },
            // {
            //     path: 'results',
            //     component: ResultsComponent,
            // },
            {
                path: '',
                component: StartComponent,
            },
        ]
    })),

    // help (will improvize language based on navigator language)
    // optional, results/quiz (will improvize language too)

    // empty for language selector
    {
        path: '',
        component: LanguageSelectorComponent,
    },

    // optional, wildcard redirect to empty
];
