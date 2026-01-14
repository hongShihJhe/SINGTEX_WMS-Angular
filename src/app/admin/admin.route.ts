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
        path: 'role/:role_code/permission', loadComponent: () => import('./role.permission/role.permission').then(m => m.RolePermission),
    },
    {
        path: 'user/:account/permission', loadComponent: () => import('./user.permission/user.permission').then(m => m.UserPermission),
    },
    {
        path: 'container_info', loadComponent: () => import('./container_info/container_info').then(m => m.ContainerInfo),
    },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
]