import { WebServiceResult } from './../@models/WebServiceResult';
import { ContainerService } from './container-service';
import { ImgsFileService } from './imgs-file-service';
import { Injectable } from '@angular/core';
import { TransferItem } from '../@models/TransferItem';
import { TransferResult } from '../@models/TransferResult';

@Injectable({
  providedIn: 'root',
})


export class TransferService {


  constructor(private imgsFileService: ImgsFileService, private containerService: ContainerService){

  }

  transfer(data: TransferItem[]) {
    return new Promise<TransferResult>((resolve, reject) => {

      // 先產生 調撥單頭檔

      // 根據調撥單號執行下面動作
      // 調撥單身檔

      // 庫存明細檔

      // 入庫明細檔

      // 最後 call webservice
      let p4 = this.imgsFileService.transfer(data)
      Promise.all([p4]).then(values => {
        var result = new TransferResult

        result.webServiceResult = new WebServiceResult()
        result.webServiceResult.IsOk = values[0]

        resolve(result)
      })
    })
  }

  transferWithContainer(data: TransferItem[], container_code: string, ime02: string){
    this.containerService.updateIME02(container_code, ime02)

    return this.transfer(data)
  }

}
