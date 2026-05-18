import { Route } from "@angular/router";

export const AdminRoutes: Route[] = [
    {
        path: 'home', loadComponent: () => import('./home/home').then(m => m.Home),
    },
    {
        path: 'user', loadComponent: () => import('./user/user').then(m => m.User),
    },
    {
        path: 'role', loadComponent: () => import('./role/role').then(m => m.Role),
    },
    {
        path: 'role/:role_code/permission', loadComponent: () => import('./role_permission/role_permission').then(m => m.RolePermission),
    },
    {
        path: 'user/:account/permission', loadComponent: () => import('./user_permission/user_permission').then(m => m.UserPermission),
    },
    {
        path: 'container_type', loadComponent: () => import('./container_type/container_type').then(m => m.ContainerType),
    },
    {
        path: 'container', loadComponent: () => import('./container/container').then(m => m.Container),
    },
    {
        path: 'container_info', loadComponent: () => import('./container_info/container_info').then(m => m.ContainerInfo),
    },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
]