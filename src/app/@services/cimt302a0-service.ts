import { ContainerService } from './container-service';
import { AuthService } from './auth-service';
import { Cimt302aApi } from '../@data/cimt302a-api';
import { Injectable } from '@angular/core';
import { Cimt302a } from '../@models/Cimt302a';
import { ContainerImgs } from '../@models/ContainerImgs';

@Injectable({
  providedIn: 'root',
})

export class Cimt302a0Service {
  constructor(private cimt302aApi: Cimt302aApi, private authService: AuthService, private containerService: ContainerService) {
  }

  getList(inb01: string) {
    return this.cimt302aApi.getListByINB01(inb01)
  }

  checkContainerExists(container: string){
    return this.containerService.checkExistsByCode(container)
  }

  submit(data: Cimt302a[]) {
    data.forEach((row, idx) => {
      // view col
      delete row._confirm

      row.out_ts = new Date()
      row.out_user = this.authService.user?.account as string

      // reset in-status
      row.in_ts = null
      row.in_user = ''
      row.IMGS03 = ''
    })


    let update = data.map(item => {
      var o = new ContainerImgs()
      o.container = item.container
      o.RVBS04 = item.RVBS04
      o.TA_RVBS14 = item.TA_RVBS14
      return o
    })

    this.containerService.updateContainerImgs(update)

    return this.cimt302aApi.update(data)
  }

}
