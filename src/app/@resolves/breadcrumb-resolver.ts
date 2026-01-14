import { ResolveFn } from '@angular/router';
import { breadcrumb_item } from '../@models/breadcrumb_item';
import { inject } from '@angular/core';
import { BreadcrumbService } from '../@services/breadcrumb-service';

export const breadcrumbResolver: ResolveFn<true> = (route, state) => {
  let breadcrumbService = inject(BreadcrumbService)
  let breadcrumb: breadcrumb_item[] = route.data['breadcrumb']

  // ensure push after subscribe
  setTimeout(() => {
    breadcrumbService.push(breadcrumb)
  }, 30)

  return true;
};
