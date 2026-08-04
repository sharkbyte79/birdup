import { Routes } from '@angular/router';
import { Home } from './home/home';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';
import { apiBasePathInterceptor } from './interceptors/api-base-path-interceptor';

export const routes: Routes = [
    {
        path: '',
        title: 'BirdUp - Home',
        component: Home,
        providers: [
            provideHttpClient(
                withInterceptors([
                    apiBasePathInterceptor
                ]),
                withRequestsMadeViaParent()
            )
        ]
    },
];
