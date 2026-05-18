import { breadcrumb_item } from '../@models/breadcrumb_item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BreadcrumbService {

  private breadcrumbSource = new Subject<breadcrumb_item[]>();

  breadcrumb$ = this.breadcrumbSource.asObservable()

  push(data: breadcrumb_item[]){
    this.breadcrumbSource.next(data)
  }
}


