import { Route } from '@angular/router';
import { FuncNames } from '../@models/FuncNames';
import { breadcrumbResolver } from '../@resolves/breadcrumb-resolver';
import { PDAFunctionData } from '../@models/PDAFunctionData';

export const ManageRoutes: Route[] = [
    { 
        path: '', pathMatch: 'full', loadComponent: () => import('./home/home').then(m => m.Home), 
        resolve: { breadcrumbLoad: breadcrumbResolver }, 
    },
    { 
        path: 'cimt302a', loadComponent: () => import('./cimt302a/cimt302a').then(m => m.Cimt302a),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'cimt302a',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: PDAFunctionData.getName('cimt302a'), current: true },
            ],
        }
    },
    { 
        path: 'cimt302a/cimt302a0', loadComponent: () => import('./cimt302a0/cimt302a0').then(m => m.Cimt302a0),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'cimt302a0',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: PDAFunctionData.getName('cimt302a') },
                { url: '/manage/cimt302a/cimt302a0', name: PDAFunctionData.getName('cimt302a0'), current: true }
            ],
        }
    },
    { 
        path: 'cimt302a/cimt302a1', loadComponent: () => import('./cimt302a1/cimt302a1').then(m => m.Cimt302a1),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'cimt302a1',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: PDAFunctionData.getName('cimt302a') },
                { url: '/manage/cimt302a/cimt302a1', name: PDAFunctionData.getName('cimt302a1'), current: true  }
            ],
        }
    },
    { 
        path: 'cimt302a/cimt302a2', loadComponent: () => import('./cimt302a2/cimt302a2').then(m => m.Cimt302a2),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'cimt302a2',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/cimt302a', name: PDAFunctionData.getName('cimt302a') },
                { url: '/manage/cimt302a/cimt302a2', name: PDAFunctionData.getName('cimt302a2'), current: true}
            ],
        } 
    },
    { 
        path: 'aimt324', loadComponent: () => import('./aimt324/aimt324').then(m => m.Aimt324),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'aimt324',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: PDAFunctionData.getName('aimt324'), current: true },
            ],
        }
    },
    { 
        path: 'aimt324/aimt3240', loadComponent: () => import('./aimt3240/aimt3240').then(m => m.Aimt3240),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'aimt3240',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: PDAFunctionData.getName('aimt324') },
                { url: '/manage/aimt3240', name: PDAFunctionData.getName('aimt3240'), current: true },
            ],
        }
    },
    { 
        path: 'aimt324/aimt3241', loadComponent: () => import('./aimt3241/aimt3241').then(m => m.Aimt3241),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'aimt3241',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: PDAFunctionData.getName('aimt324') },
                { url: '/manage/aimt3241', name: PDAFunctionData.getName('aimt3241'), current: true },
            ],
            func: 'container_change',
        }
    },
    { 
        path: 'aimt324/aimt3242', loadComponent: () => import('./aimt3242/aimt3242').then(m => m.Aimt3242),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'aimt3242',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: PDAFunctionData.getName('aimt324') },
                { url: '/manage/aimt3242', name: PDAFunctionData.getName('aimt3242'), current: true },
            ],
            func: 'container_transfer',
        }
    },
    { 
        path: 'aimt324/aimt3243', loadComponent: () => import('./aimt3243/aimt3243').then(m => m.Aimt3243),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'aimt3243',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/aimt324', name: PDAFunctionData.getName('aimt324') },
                { url: '/manage/aimt3243', name: PDAFunctionData.getName('aimt3243'), current: true },
            ],
        }
    },
    { 
        path: 'search', loadComponent: () => import('./search/search').then(m => m.Search),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'search',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/search', name: PDAFunctionData.getName('search'), current: true },
            ],
        }
    },
    { 
        path: 'search/search0', loadComponent: () => import('./search0/search0').then(m => m.Search0),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'search0',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/search', name: PDAFunctionData.getName('search') },
                { url: '/manage/search0', name: PDAFunctionData.getName('search0'), current: true },
            ],
        }
    },
    { 
        path: 'search/search1', loadComponent: () => import('./search1/search1').then(m => m.Search1),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'search1',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/search', name: PDAFunctionData.getName('search') },
                { url: '/manage/search1', name: PDAFunctionData.getName('search1'), current: true },
            ],
            func: 'search_imgs',
        }
    },
    { 
        path: 'csfi514', loadComponent: () => import('./csfi514/csfi514').then(m => m.Csfi514),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'csfi514',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: PDAFunctionData.getName('csfi514'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5140', loadComponent: () => import('./csfi5140/csfi5140').then(m => m.Csfi5140),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'csfi5140',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: PDAFunctionData.getName('csfi514') },
                { url: '/manage/csfi5140', name: PDAFunctionData.getName('csfi5140'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5141', loadComponent: () => import('./csfi5141/csfi5141').then(m => m.Csfi5141),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'csfi5141',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: PDAFunctionData.getName('csfi514') },
                { url: '/manage/csfi5141', name: PDAFunctionData.getName('csfi5141'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5142', loadComponent: () => import('./csfi5142/csfi5142').then(m => m.Csfi5142),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'csfi5142',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: PDAFunctionData.getName('csfi514') },
                { url: '/manage/csfi5142', name: PDAFunctionData.getName('csfi5142'), current: true },
            ],
        }
    },
    { 
        path: 'csfi514/csfi5143', loadComponent: () => import('./csfi5143/csfi5143').then(m => m.Csfi5143),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'csfi5143',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi514', name: PDAFunctionData.getName('csfi514') },
                { url: '/manage/csfi5143', name: PDAFunctionData.getName('csfi5143'), current: true },
            ],
        }
    },
    { 
        path: 'asft620', loadComponent: () => import('./asft620/asft620').then(m => m.Asft620),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft620',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: PDAFunctionData.getName('asft620'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6200', loadComponent: () => import('./asft6200/asft6200').then(m => m.Asft6200),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft6200',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: PDAFunctionData.getName('asft620') },
                { url: '/manage/asft6200', name: PDAFunctionData.getName('asft6200'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6201', loadComponent: () => import('./asft6201/asft6201').then(m => m.Asft6201),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft6201',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: PDAFunctionData.getName('asft620') },
                { url: '/manage/asft6201', name: PDAFunctionData.getName('asft6201'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6202', loadComponent: () => import('./asft6202/asft6202').then(m => m.Asft6202),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft6202',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: PDAFunctionData.getName('asft620') },
                { url: '/manage/asft6202', name: PDAFunctionData.getName('asft6202'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6203', loadComponent: () => import('./asft6203/asft6203').then(m => m.Asft6203),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft6203',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: PDAFunctionData.getName('asft620') },
                { url: '/manage/asft6203', name: PDAFunctionData.getName('asft6203'), current: true },
            ],
        }
    },
    { 
        path: 'asft620/asft6204', loadComponent: () => import('./asft6204/asft6204').then(m => m.Asft6204),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft6204',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft620', name: PDAFunctionData.getName('asft620') },
                { url: '/manage/asft6204', name: PDAFunctionData.getName('asft6204'), current: true },
            ],
        }
    },
    { 
        path: 'asft700', loadComponent: () => import('./asft700/asft700').then(m => m.Asft700),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft700',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: PDAFunctionData.getName('asft700'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7000', loadComponent: () => import('./asft7000/asft7000').then(m => m.Asft7000),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft7000',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: PDAFunctionData.getName('asft700') },
                { url: '/manage/asft700/asft7000', name: PDAFunctionData.getName('asft7000'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7001', loadComponent: () => import('./asft7001/asft7001').then(m => m.Asft7001),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft7001',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: PDAFunctionData.getName('asft700') },
                { url: '/manage/asft700/asft7001', name: PDAFunctionData.getName('asft7001'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7002', loadComponent: () => import('./asft7002/asft7002').then(m => m.Asft7002),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft7002',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: PDAFunctionData.getName('asft700') },
                { url: '/manage/asft700/asft7002', name: PDAFunctionData.getName('asft7002'), current: true },
            ],
        }
    },
    { 
        path: 'asft700/asft7003', loadComponent: () => import('./asft7003/asft7003').then(m => m.Asft7003),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'asft7003',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/asft700', name: PDAFunctionData.getName('asft700') },
                { url: '/manage/asft700/asft7002', name: PDAFunctionData.getName('asft7003'), current: true },
            ],
        }
    },
    { 
        path: 'csfi301', loadComponent: () => import('./csfi301/csfi301').then(m => m.Csfi301),
        resolve: { breadcrumbLoad: breadcrumbResolver },
        data: {
            func_code: 'csfi301',
            breadcrumb: [
                { url: '/manage', name: '主選單' },
                { url: '/manage/csfi301', name: PDAFunctionData.getName('csfi301'), current: true },
            ],
        }
    },
]