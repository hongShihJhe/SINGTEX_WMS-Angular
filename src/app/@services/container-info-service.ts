import { ContainerService } from './container-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ContainerInfoService {
  
  constructor(private containerService: ContainerService){

  }

  getList(){
    return this.containerService.getList()
  }

}
