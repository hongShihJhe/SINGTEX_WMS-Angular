import { ImgsFileService } from './imgs-file-service';
import { ContainerService } from './container-service';
import { Injectable } from '@angular/core';
import { SubmitResult } from '../@models/SubmitResult';
import { Aimt324View } from '../@models/Aimt324View';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';
import { ContainerImgs } from '../@models/ContainerImgs';
import { TransferItem } from '../@models/TransferItem';
import { GlobalParams } from '../@models/GlobalParams';

@Injectable({
  providedIn: 'root',
})
export class Aimt324Service {

  constructor(private containerService: ContainerService, private imgsFileService: ImgsFileService) {

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

      this.imgsFileService.getImgsFile(data.RVBS04).then(imgs_file => {
        if (imgs_file) {
          result.IMGS03 = imgs_file.IMGS03
        }
        resolve(result)
      })
    })
  }


  submit(data: Aimt324View[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let containerImgss = data.map(item => {
        var o = new ContainerImgs()
        o.RVBS04 = item.RVBS04
        o.TA_RVBS14 = item.TA_RVBS14
        o.container = item.to_container
        return o
      })
      this.containerService.updateContainerImgs(containerImgss)

      //
      let transferItems = data.map(item => {
        var o = new TransferItem()
        o.RVBS04 = item.RVBS04
        o.TA_RVBS14 = item.TA_RVBS14
        o.IMG03 = item.to_container_IMGS03
        return o
      })
      this.imgsFileService.transfer(transferItems).then(transferResult => {
        resolve(result)
      })

    })

  }
}


