import { ResolveFn } from '@angular/router';

export const rolesResolver: ResolveFn<string[]> = (route, state) => {
  return ['a', 'n'];
};
