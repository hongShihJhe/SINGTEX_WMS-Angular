import { ContainerImgsService } from './container-imgs-service';
import { Injectable } from '@angular/core';
import { SubmitResult } from '../@models/SubmitResult';
import { ContainerImgs } from '../@models/ContainerImgs';
import { ContainerLocation } from '../@models/ContainerLocation';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';
import { ContainerLocationService } from './container-location-service';

@Injectable({
  providedIn: 'root',
})


export class ContainerService {
  constructor(private containerImgsService: ContainerImgsService, private containerLocationService: ContainerLocationService) {
  }

  getImgsByRVBS04(value: string) {
    return this.containerImgsService.getImgsByRVBS04(value)
  }

  getImgsByTA_RVBS14(value: string) {
    return this.containerImgsService.getImgsByTA_RVBS14(value)
  }

  getImgsByRVBS04OrTA_RVBS14(value: string){
    return this.containerImgsService.getImgsByRVBS04OrTA_RVBS14(value)
  }

  getImgsList(container: string) {
    return this.containerImgsService.getImgsList(container)
  }

  getLocation(container: string) {
    return this.containerLocationService.getLocation(container)
  }

  getContainerImgsInfoByRVBS04(rvbs04: string) {
    return new Promise<ContainerImgsInfo | undefined>((resolve, reject) => {
      var result = new ContainerImgsInfo()

      this.getImgsByRVBS04(rvbs04).then(imgs => {
        if (imgs) {
          result.container = imgs.container
          result.RVBS04 = imgs.RVBS04
          result.TA_RVBS14 = imgs.TA_RVBS14
          this.getLocation(imgs.container).then(loc => {
            if (loc) {
              result.container_IMGS03 = loc?.IMGS03
            }

            resolve(result)
          })
        } else {
          resolve(undefined)
        }
        
      })

    })
  }

  getContainerImgsInfoByTA_RVBS14(ta_rvbs14: string) {
    return new Promise<ContainerImgsInfo | undefined>((resolve, reject) => {
      var result = new ContainerImgsInfo()

      this.getImgsByTA_RVBS14(ta_rvbs14).then(imgs => {
        if (imgs) {
          result.container = imgs.container
          result.RVBS04 = imgs.RVBS04
          result.TA_RVBS14 = imgs.TA_RVBS14
          this.getLocation(imgs.container).then(loc => {
            if (loc) {
              result.container_IMGS03 = loc?.IMGS03
            }

            //
            resolve(result)
          })
        } else {
          resolve(undefined)
        }
      })

    })
  }

  updateIMGS03(container: string, imgs03: string) {
    return this.containerLocationService.updateIMGS03(container, imgs03)
  }

  updateContainerImgs(data: ContainerImgs[]){
    return this.containerImgsService.update(data)
  }

  changeContainer(from_container:string, to_container:string){
    return this.containerImgsService.changeContainer(from_container, to_container)
  }

}



