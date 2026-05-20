import { ContainerService } from './container-service';
import { Injectable } from '@angular/core';
import { TransferService } from './transfer-service';
import { TransferItem } from '../@models/TransferItem';

@Injectable({
  providedIn: 'root',
})

export class Aimt3242Service {

  constructor(private containerService: ContainerService, private transferService: TransferService) {

  }


  checkContainerExitst(container: string){
    return this.containerService.checkExistsByCode(container)
  }

  fetchTableData(container: string) {
    return this.containerService.getImgsList(container)
  }

  submit(transferItems: TransferItem[], container: string, ime02: string) {
    return this.transferService.transferWithContainer(transferItems, container, ime02)
  }

}


