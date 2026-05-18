import { ContainerService } from './container-service';
import { AuthService } from './auth-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cimt302aView } from '../@models/Cimt302aView';
import { PlatformLocation } from '@angular/common';
import { SubmitResult } from '../@models/SubmitResult';
import { Cimt302aApi } from '../@data/cimt302a-api';
import { ContainerImgs } from '../@models/ContainerImgs';

@Injectable({
  providedIn: 'root',
})

export class Cimt302a1Service {
  constructor(private cimt302aApi: Cimt302aApi, private authService: AuthService, private containerService: ContainerService) {
  }

  getListByContainer(container: string) {
    return this.cimt302aApi.getOutListByContainer(container)
  }

  submit(container:string, imgs03: string, data: Cimt302aView[]) {
    for (let row of data) {
      row.IMGS03 = imgs03
      row.in_ts = new Date()
      row.in_user = this.authService.user?.account as string
    }

    this.containerService.updateIMGS03(container, imgs03)

    return this.cimt302aApi.update(data)
  }

}
