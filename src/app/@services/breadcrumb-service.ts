import { breadcrumbItem } from '../@models/breadcrumbItem';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BreadcrumbService {

  private breadcrumbSource = new Subject<breadcrumbItem[]>();

  breadcrumb$ = this.breadcrumbSource.asObservable()

  push(data: breadcrumbItem[]){
    this.breadcrumbSource.next(data)
  }
}


