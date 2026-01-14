import { Admin } from './admin/admin';
import { Routes } from '@angular/router';
import { Manage } from './manage/manage';
import { authGuard } from './@guards/auth-guard';
import { emptyPathGuard } from './@guards/empty-path-guard';
import { adminGuard } from './@guards/admin-guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
    {
        path: 'manage',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        loadComponent: () => import('./manage/manage').then(m => m.Manage),
        loadChildren: () => import('./manage/manage.routes').then(m => m.ManageRoutes),
    },
    {
        path: 'admin',
        canActivate: [adminGuard],
        canActivateChild: [adminGuard],
        loadComponent: () => import('./admin/admin').then(m => m.Admin),
        loadChildren: () => import('./admin/admin.route').then(m => m.AdminRoutes),
    },
    { path: '', pathMatch: 'full', canActivate: [emptyPathGuard], loadComponent: () => import('./login/login').then(m => m.Login) },
    { path: '**', loadComponent: () => import('./notfound/notfound').then(m => m.Notfound) }
];
