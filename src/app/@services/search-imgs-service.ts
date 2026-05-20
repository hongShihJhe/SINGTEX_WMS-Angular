import { Injectable } from '@angular/core';
import { ContainerService } from './container-service';
import { ImgsFileService } from './imgs-file-service';

@Injectable({
  providedIn: 'root',
})
export class SearchImgsService {
  
  constructor(private containerService: ContainerService, private imgsFileService: ImgsFileService){}

  /**
   * 
   * @param imgs_value RVBS04 or TA_RVBS14
   * @returns 
   */
  fetchTableData(imgs_value: string){
    return new Promise<any>((resolve, reject) => {
      this.containerService.getImgsByRVBS04OrTA_RVBS14(imgs_value).then(container_imgs => {
        if (container_imgs) {
          Promise.all([
            this.imgsFileService.get(container_imgs.RVBS04),
            this.containerService.getLocation(container_imgs.container)
          ]).then(values => {
            let imgs_file = values[0]
            let loc = values[1]

            var data: any = {}
            data.container = container_imgs.container
            data.container_IMGS03 = loc?.ime02
            data.IMGS02 = imgs_file?.IMGS02
            data.IMGS03 = imgs_file?.IMGS03
            data.IMGS08 = imgs_file?.IMGS08
            data.IMGS07 = imgs_file?.IMGS07
            
            resolve(data)
          })
        } else{
          resolve(undefined)
        }
        
      })
     
    })
  }

}
