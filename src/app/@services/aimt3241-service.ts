import { ContainerService } from './container-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Aimt3241Service {

  constructor(private containerService: ContainerService) {

  }

  checkConainerExists(container: string){
    return this.containerService.checkExistsByCode(container)
  }

  fetchTableData(container: string){
    return this.containerService.getImgsList(container)
  }

  submit(from_cotainer: string, to_container: string){
    return this.containerService.moveImgs(from_cotainer, to_container)
  }
}


