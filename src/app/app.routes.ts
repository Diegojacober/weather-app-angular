import { Routes } from '@angular/router';
import { CityComponent } from './pages/city/city.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: "weather/:state/:city",
                component: CityComponent,
                title: "Weather"
            },
            {
                path: "home",
                component: HomeComponent,
                title: "Weather"
            },
        ]
    },
];
