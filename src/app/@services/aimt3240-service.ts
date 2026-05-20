import { TransferService } from './transfer-service';
import { ImgsFileService } from './imgs-file-service';
import { ContainerService } from './container-service';
import { Injectable } from '@angular/core';
import { SubmitResult } from '../@models/SubmitResult';
import { Aimt324 } from '../@models/Aimt324';
import { ContainerImgs } from '../@models/ContainerImgs';
import { TransferItem } from '../@models/TransferItem';
import { StringUtil } from '../@utils/StringUtil';

@Injectable({
  providedIn: 'root',
})

export class Aimt3240Service {

  constructor(private transferService: TransferService, private containerService: ContainerService, private imgsFileService: ImgsFileService) {

  }

  /**
   * 
   * @param value 製造批號或布疋號
   * @returns 
   */
  getData(value: string) {
    return new Promise<any>((resolve, reject) => {
      this.containerService.getImgsByRVBS04OrTA_RVBS14(value).then(container_imgs => {
        if (container_imgs) {
          this.toDto(container_imgs).then(dto => {
            resolve(dto)
          })
        } else {
          resolve(undefined)
        }
      })
    })
  }

  getContainerIME02(container: string){
    return new Promise<string | undefined>((resolve, reject) => {
      this.containerService.getLocation(container).then(data => {
        resolve(data?.ime02)
      })
    })
  }

  submit(data: Aimt324[]) {
    return new Promise<SubmitResult>((resolve, reject) => {

      let transferItems = data.map(item => {
        var o = new TransferItem()
        o.RVBS04 = item.RVBS04
        o.TA_RVBS14 = item.TA_RVBS14
        o.IMG03 = item.to_container_IMGS03
        return o
      })

      this.transferService.transfer(transferItems).then(transferResult => {

        let result = new SubmitResult()

        if (transferResult.webServiceResult?.IsOk){
          result.succ = true
          this.containerService.updateContainerImgs(this.toContainerImgs(data))
        } else {
          result.succ = false
          result.message = transferResult.webServiceResult?.description
        }

        resolve(result)
      })
    })
  }

  private toDto(data: ContainerImgs) {
    return new Promise((resolve, reject) => {
      var result = {
        RVBS04: '',
        TA_RVBS14: '',
        container: '',
        IMGS03: ''
      }

      result.RVBS04 = data.RVBS04
      result.TA_RVBS14 = data.TA_RVBS14
      result.container = data.container

      this.imgsFileService.get(data.RVBS04).then(imgs_file => {
        if (imgs_file) {
          result.IMGS03 = imgs_file.IMGS03
        }
        resolve(result)
      })
    })
  }

  private toContainerImgs(data: Aimt324[]){
    return data.map(item => {
      var o = new ContainerImgs()
      o.RVBS04 = item.RVBS04
      o.TA_RVBS14 = item.TA_RVBS14
      o.container = item.to_container
      return o
    })
  }
}


