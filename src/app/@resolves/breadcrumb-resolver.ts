import { ResolveFn } from '@angular/router';
import { breadcrumbItem } from '../@models/breadcrumbItem';
import { inject } from '@angular/core';
import { BreadcrumbService } from '../@services/breadcrumb-service';

export const breadcrumbResolver: ResolveFn<true> = (route, state) => {
  let breadcrumbService = inject(BreadcrumbService)
  let breadcrumb: breadcrumbItem[] = route.data['breadcrumb']

  // ensure push after subscribe
  setTimeout(() => {
    breadcrumbService.push(breadcrumb)
  }, 30)

  return true;
};
