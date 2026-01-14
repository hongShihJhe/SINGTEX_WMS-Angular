import { Route } from '@angular/router';
import { FuncNames } from '../@models/FuncNames';
import { breadcrumbResolver } from '../@resolves/breadcrumb-resolver';

export const ManageRoutes: Route[] = [
    { 
        path: '', pathMatch: 'full', loadComponent: () => import('./home/home').then(m => m.Home), 
        resolve: { breadcrumbLoad: breadcrumbResolver }, 
    },
    { 
        path: 'cimt302a', loadComponent: () => import('./cimt302a/cimt302a').then(m => m.Cimt302a),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: FuncNames.get('cimt302a'), current: true },
            ],
        }
    },
    { 
        path: 'cimt302a/cimt302a0', loadComponent: () => import('./cimt302a0/cimt302a0').then(m => m.Cimt302a0),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: FuncNames.get('cimt302a') },
                { url: '/manage/cimt302a/cimt302a0', name: FuncNames.get('cimt302a0'), current: true }
            ],
            func: 'cimt302a0',
        }
    },
    { 
        path: 'cimt302a/cimt302a1', loadComponent: () => import('./cimt302a1/cimt302a1').then(m => m.Cimt302a1),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: FuncNames.get('cimt302a') },
                { url: '/manage/cimt302a/cimt302a1', name: FuncNames.get('cimt302a1'), current: true  }
            ],
            func: 'cimt302a1',
        }
    },
    { 
        path: 'cimt302a/cimt302a2', loadComponent: () => import('./cimt302a2/cimt302a2').then(m => m.Cimt302a2),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: FuncNames.get('cimt302a') },
                { url: '/manage/cimt302a/cimt302a2', name: FuncNames.get('cimt302a2'), current: true}
            ],
            func: 'cimt302a2',
        } 
    },
    { 
        path: 'transfer', loadComponent: () => import('./transfer/transfer').then(m => m.Transfer),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/transfer', name: FuncNames.get('transfer'), current: true },
            ],
        }
    },
    { 
        path: 'transfer/aimt324', loadComponent: () => import('./aimt324/aimt324').then(m => m.Aimt324),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/transfer', name: FuncNames.get('transfer') },
                { url: '/manage/aimt324', name: FuncNames.get('aimt324'), current: true },
            ],
            func: 'aimt324',
        }
    },
    { 
        path: 'transfer/container_change', loadComponent: () => import('./container_change/container_change').then(m => m.ContainerChange),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/transfer', name: FuncNames.get('transfer') },
                { url: '/manage/container_change', name: FuncNames.get('container_change'), current: true },
            ],
            func: 'container_change',
        }
    },
    { 
        path: 'transfer/container_transfer', loadComponent: () => import('./container_transfer/container_transfer').then(m => m.ContainerTransfer),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/transfer', name: FuncNames.get('transfer') },
                { url: '/manage/container_transfer', name: FuncNames.get('container_transfer'), current: true },
            ],
            func: 'container_transfer',
        }
    },
    { 
        path: 'transfer/container_binding', loadComponent: () => import('./container_binding/container_binding').then(m => m.ContainerBinding),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/transfer', name: FuncNames.get('transfer') },
                { url: '/manage/container_binding', name: FuncNames.get('container_binding'), current: true },
            ],
            func: 'container_binding',
        }
    },
    { 
        path: 'search', loadComponent: () => import('./search/search').then(m => m.Search),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/search', name: FuncNames.get('search'), current: true },
            ],
        }
    },
    { 
        path: 'search/search_container', loadComponent: () => import('./search_container/search_container').then(m => m.SearchContainer),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/search', name: FuncNames.get('search') },
                { url: '/manage/search_container', name: FuncNames.get('search_container'), current: true },
            ],
            func: 'search_container',
        }
    },
    { 
        path: 'search/search_imgs', loadComponent: () => import('./search_imgs/search_imgs').then(m => m.SearchImgs),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/search', name: FuncNames.get('search') },
                { url: '/manage/search_imgs', name: FuncNames.get('search_imgs'), current: true },
            ],
            func: 'search_imgs',
        }
    }
]