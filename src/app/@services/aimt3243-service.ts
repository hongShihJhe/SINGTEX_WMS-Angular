import { SubmitResultWithData } from '../@models/SubmitResult';
import { ContainerService } from './container-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Aimt3243Service {
  constructor(private containerService: ContainerService) {

  }

  fetchTableData(container: string){
    return this.containerService.getImgsList(container)
  }

  checkContainerExistsAndGetIME02(container: string){
    return new Promise<SubmitResultWithData<string>>((resolve, reject) => {
      let result = new SubmitResultWithData<string>()
      this.containerService.checkExistsByCode(container).then(bool => {
        if (bool){
          this.containerService.getLocation(container).then(loc => {
            result.data = loc?.ime02
            resolve(result)
          })
        } else {
          result.succ = false
          resolve(result)
        }
      })
    })
  }

  submit(container: string, ime02: string){
    return this.containerService.updateIME02(container, ime02)
  }
  
}


