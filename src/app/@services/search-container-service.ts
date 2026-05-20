import { Injectable } from '@angular/core';
import { ContainerService } from './container-service';
import { ImgsFileService } from './imgs-file-service';

@Injectable({
  providedIn: 'root',
})
export class SearchContainerService {
  
  constructor(private containerService: ContainerService, private imgsFileService: ImgsFileService){}

  fetchTableData(container: string){
    return new Promise<any[]>((resolve, reject) => {
      Promise.all([
        this.containerService.getImgsList(container),
        this.imgsFileService.getList()
      ]).then(values => {
        let container_imgs_list = values[0]
        let imgs_file_list = values[1]

        let data = container_imgs_list.map(container_imgs => {
          var result: any = {
            RVBS04: '',
            TA_RVBS14: '',
            IMGS02: '',
            IMGS03: '',
            IMGS08: '',
            IMGS07: ''
          }

          result.RVBS04 = container_imgs.RVBS04
          result.TA_RVBS14 = container_imgs.TA_RVBS14

          let imgs_file = imgs_file_list.find(o => o?.IMGS06 === container_imgs.RVBS04)
          if (imgs_file) {
            result.IMGS02 = imgs_file.IMGS02
            result.IMGS03 = imgs_file.IMGS03
            result.IMGS08 = imgs_file.IMGS08
            result.IMGS07 = imgs_file.IMGS07
          }

          return result
        })

        resolve(data)
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
}
