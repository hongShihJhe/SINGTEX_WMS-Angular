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
        path: 'aimt324', loadComponent: () => import('./aimt324/aimt324').then(m => m.Aimt324),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: FuncNames.get('aimt324'), current: true },
            ],
        }
    },
    { 
        path: 'aimt324/aimt3240', loadComponent: () => import('./aimt3240/aimt3240').then(m => m.Aimt3240),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: FuncNames.get('aimt324') },
                { url: '/manage/aimt3240', name: FuncNames.get('aimt3240'), current: true },
            ],
            func: 'aimt324',
        }
    },
    { 
        path: 'aimt324/aimt3241', loadComponent: () => import('./aimt3241/aimt3241').then(m => m.Aimt3241),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: FuncNames.get('aimt324') },
                { url: '/manage/aimt3241', name: FuncNames.get('aimt3241'), current: true },
            ],
            func: 'container_change',
        }
    },
    { 
        path: 'aimt324/aimt3242', loadComponent: () => import('./aimt3242/aimt3242').then(m => m.Aimt3242),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: FuncNames.get('aimt324') },
                { url: '/manage/aimt3242', name: FuncNames.get('aimt3242'), current: true },
            ],
            func: 'container_transfer',
        }
    },
    { 
        path: 'aimt324/aimt3243', loadComponent: () => import('./aimt3243/aimt3243').then(m => m.Aimt3243),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: FuncNames.get('aimt324') },
                { url: '/manage/aimt3243', name: FuncNames.get('aimt3243'), current: true },
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
    },
    { 
        path: 'csfi514', loadComponent: () => import('./csfi514/csfi514').then(m => m.Csfi514),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: FuncNames.get('csfi514'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5140', loadComponent: () => import('./csfi5140/csfi5140').then(m => m.Csfi5140),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: FuncNames.get('csfi514') },
                { url: '/manage/csfi5140', name: FuncNames.get('csfi5140'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5141', loadComponent: () => import('./csfi5141/csfi5141').then(m => m.Csfi5141),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: FuncNames.get('csfi514') },
                { url: '/manage/csfi5141', name: FuncNames.get('csfi5141'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5142', loadComponent: () => import('./csfi5142/csfi5142').then(m => m.Csfi5142),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: FuncNames.get('csfi514') },
                { url: '/manage/csfi5142', name: FuncNames.get('csfi5142'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5143', loadComponent: () => import('./csfi5143/csfi5143').then(m => m.Csfi5143),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: FuncNames.get('csfi514') },
                { url: '/manage/csfi5143', name: FuncNames.get('csfi5143'), current: true },
            ],
        }
    },
    { 
        path: 'asft620', loadComponent: () => import('./asft620/asft620').then(m => m.Asft620),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: FuncNames.get('asft620'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6200', loadComponent: () => import('./asft6200/asft6200').then(m => m.Asft6200),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: FuncNames.get('asft620') },
                { url: '/manage/asft6200', name: FuncNames.get('asft6200'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6201', loadComponent: () => import('./asft6201/asft6201').then(m => m.Asft6201),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: FuncNames.get('asft620') },
                { url: '/manage/asft6201', name: FuncNames.get('asft6201'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6202', loadComponent: () => import('./asft6202/asft6202').then(m => m.Asft6202),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: FuncNames.get('asft620') },
                { url: '/manage/asft6202', name: FuncNames.get('asft6202'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6203', loadComponent: () => import('./asft6203/asft6203').then(m => m.Asft6203),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: FuncNames.get('asft620') },
                { url: '/manage/asft6203', name: FuncNames.get('asft6203'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6204', loadComponent: () => import('./asft6204/asft6204').then(m => m.Asft6204),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: FuncNames.get('asft620') },
                { url: '/manage/asft6204', name: FuncNames.get('asft6204'), current: true },
            ],
        }
    },
    { 
        path: 'asft700', loadComponent: () => import('./asft700/asft700').then(m => m.Asft700),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: FuncNames.get('asft700'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7000', loadComponent: () => import('./asft7000/asft7000').then(m => m.Asft7000),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: FuncNames.get('asft700') },
                { url: '/manage/asft700/asft7000', name: FuncNames.get('asft7000'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7001', loadComponent: () => import('./asft7001/asft7001').then(m => m.Asft7001),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: FuncNames.get('asft700') },
                { url: '/manage/asft700/asft7001', name: FuncNames.get('asft7001'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7002', loadComponent: () => import('./asft7002/asft7002').then(m => m.Asft7002),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: FuncNames.get('asft700') },
                { url: '/manage/asft700/asft7002', name: FuncNames.get('asft7002'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7003', loadComponent: () => import('./asft7003/asft7003').then(m => m.Asft7003),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: FuncNames.get('asft700') },
                { url: '/manage/asft700/asft7002', name: FuncNames.get('asft7003'), current: true },
            ],
        }
    },
    { 
        path: 'csfi301', loadComponent: () => import('./csfi301/csfi301').then(m => m.Csfi301),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi301', name: FuncNames.get('csfi301'), current: true },
            ],
        }
    },
]