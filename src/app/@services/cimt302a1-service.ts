import { TransferService } from './transfer-service';
import { ContainerService } from './container-service';
import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';
import { Cimt302a } from '../@models/Cimt302a';
import { Cimt302aApi } from '../@apis/cimt302a-api';
import { TransferItem } from '../@models/TransferItem';
import { SubmitResult } from '../@models/SubmitResult';

@Injectable({
  providedIn: 'root',
})

export class Cimt302a1Service {
  constructor(
    private cimt302aApi: Cimt302aApi, 
    private authService: AuthService, 
    private containerService: ContainerService, 
    private transferService: TransferService
    ) {
  }

  getListByContainer(container: string) {
    return this.cimt302aApi.getOutListByContainer(container)
  }

  checkContainerExists(container_code: string){
    return this.containerService.checkExistsByCode(container_code)
  }

  submit(container:string, imgs03: string, data: Cimt302a[]) {

    return new Promise<SubmitResult>((resolve, reject) => {

      let result = new SubmitResult()

      let transferItems = data.map(o => {
        let item = new TransferItem()
        item.IMG03 = imgs03
        item.RVBS04 = o.RVBS04
        item.TA_RVBS14 = o.TA_RVBS14
        return item
      })

      this.transferService.transferWithContainer(transferItems, container, imgs03).then(res => {
        if (!res.webServiceResult?.IsOk){
          result.succ = false
          result.message = res.webServiceResult?.description
        }
        else{
          for (let row of data) {
            row.IMGS03 = imgs03
            row.in_ts = new Date()
            row.in_user = this.authService.user?.account as string
          }

          this.cimt302aApi.update(data)
        }

        resolve(result)
      })

    })

    
  }


}
