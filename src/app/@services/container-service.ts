import { ContainerValidator } from './../@validators/container-validator';
import { ContainerImgsApi } from '../@data/container-imgs-api';
import { Injectable } from '@angular/core';
import { SubmitResult, SubmitResultWithData } from '../@models/SubmitResult';
import { ContainerImgs } from '../@models/ContainerImgs';
import { ContainerLocation } from '../@models/ContainerLocation';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';
import { ContainerLocationApi } from '../@data/container-location-api';
import { ContainerApi } from '../@data/container-api';
import { Container } from '../@models/Container';
import { ContainerTypeApi } from '../@data/container-type-api';
import { ContainerValidatorCodes } from '../@validators/ContainerValidatorCodes';
import { checkHandler } from '../@models/handler';

@Injectable({
  providedIn: 'root',
})


export class ContainerService {
  constructor(
    private containerImgsService: ContainerImgsApi, 
    private containerLocationService: ContainerLocationApi, 
    private containerApi: ContainerApi,
    private containerValidator: ContainerValidator,
    private containerTypeApi: ContainerTypeApi) {

  }

  get(container_type: string, container_no: string){
    return this.containerApi.get(container_type, container_no)
  }

  getList(){
    let result = new SubmitResultWithData<any>()
    return new Promise<SubmitResultWithData<any>>((resolve, reject) => {

      let p1 = this.containerTypeApi.getList()
      let p2 = this.containerApi.getList()
      Promise.all([p1, p2]).then(values => {
        let container_type_list = values[0]
        let container_list = values[1]

        let map = container_list.map(item => {
          let row: any = {}
          row.container_type = item.container_type
          row.container_type_name = container_type_list.find(item => item.container_type == row.container_type)?.container_type_name
          row.container_no = item.container_no
          row.memo = item.memo

          return row
        })

        result.succ = true
        result.data = map

        resolve(result)
      })

    })
  }


  validateAdd(data: Container) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let validateResult = this.containerValidator.validateAdd(data)
      if (!validateResult.succ){
        result.succ = false
        result.code = validateResult.code
        result.message = validateResult.message
      }

      resolve(result)
    })
  }

  checkExistsWhenAdd(data: Container) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()
      this.containerApi.checkExists(data.container_type, data.container_no).then(bool => {
        if (bool) {
          result.succ = false
          result.code = ContainerValidatorCodes.D001
          result.message = 'data already exists'
        }
        resolve(result)
      })
    })
  }

  private _add(data: Container){
    return new Promise<SubmitResult>((resolve, reject) => {
      this.containerApi.add(data).then(res => {
        let result = new SubmitResult()
        result.succ = true
        result.message = ''
        resolve(result)
      })
    })
  }
  

  add(data: Container){
    let _validateAddHandler = new checkHandler<Container>(this.validateAdd.bind(this))
    let _checkExistsHandler = new checkHandler<Container>(this.checkExistsWhenAdd.bind(this))
    let _addHandler = new checkHandler<Container>(this._add.bind(this))

    _validateAddHandler.setNext(_checkExistsHandler)
    _checkExistsHandler.setNext(_addHandler)

    return _validateAddHandler.handleFunc(data)
  }

  validateUpdate(data: Container){
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let validateResult = this.containerValidator.validateUpdate(data)
      if (!validateResult.succ){
        result.succ = false
        result.code = validateResult.code
        result.message = validateResult.message
      }

      resolve(result)
    })
  }

  checkExistsWhenUpdate(data: Container) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()
      this.containerApi.checkExists(data.container_type, data.container_no).then(bool => {
        if (!bool) {
          result.succ = false
          result.code = ContainerValidatorCodes.D000
          result.message = 'data not exists'
        }
        resolve(result)
      })
    })
  }


  private _update(data: Container){
    return new Promise<SubmitResult>((resolve, reject) => {
      this.containerApi.update(data).then(res => {
        let result = new SubmitResult()
        result.succ = true
        result.message = ''
        resolve(result)
      })
    })
  }

  update(data: Container){
    let _validateUpdateHandler = new checkHandler<Container>(this.validateUpdate.bind(this))
    let _checkExistsHandler = new checkHandler<Container>(this.checkExistsWhenUpdate.bind(this))
    let _updateHandler = new checkHandler<Container>(this._update.bind(this))

    _validateUpdateHandler.setNext(_checkExistsHandler)
    _checkExistsHandler.setNext(_updateHandler)

    return _validateUpdateHandler.handleFunc(data)
  }
  
  delete(container_type: string, container_no: string){
    let result = new SubmitResult()
    return new Promise<SubmitResult>((resolve, reject) => {
      this.containerApi.delete(container_type, container_no).then(res => {
        result.succ = true
        resolve(result)
      })
      .catch(reject)
    })
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
      let result = new ContainerImgsInfo()

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
      let result = new ContainerImgsInfo()

      this.getImgsByTA_RVBS14(ta_rvbs14).then(imgs => {
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



