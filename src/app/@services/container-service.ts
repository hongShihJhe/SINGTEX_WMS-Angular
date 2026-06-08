import { ImgsFileService } from './imgs-file-service';
import { ContainerValidator } from './../@validators/container-validator';
import { ContainerImgsApi } from '../@apis/container-imgs-api';
import { Injectable } from '@angular/core';
import { SubmitResult, SubmitResultWithData } from '../@models/SubmitResult';
import { ContainerImgs } from '../@models/ContainerImgs';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';
import { ContainerLocationApi } from '../@apis/container-location-api';
import { ContainerApi } from '../@apis/container-api';
import { Container } from '../@models/Container';
import { ContainerTypeApi } from '../@apis/container-type-api';
import { ContainerValidatorCodes } from '../@validators/ContainerValidatorCodes';
import { checkHandler } from '../@models/checkHandler';
import { StringUtil } from '../@utils/StringUtil';
import { GlobalParams } from '../@models/GlobalParams';

@Injectable({
  providedIn: 'root',
})


export class ContainerService {
  constructor(
    private containerImgsService: ContainerImgsApi, 
    private containerLocationService: ContainerLocationApi, 
    private containerApi: ContainerApi,
    private containerValidator: ContainerValidator,
    private containerTypeApi: ContainerTypeApi,
    private imgsFileService: ImgsFileService) {

  }

  feedData(){
    let data = new Container()
    data.container_type = 'A'
    data.container_no = '001'
    data.memo = '預設自動產生'

    let data2 = new Container()
    data2.container_type = 'A'
    data2.container_no = '002'
    data2.memo = '預設自動產生'

    let data3 = new Container()
    data3.container_type = 'A'
    data3.container_no = '003'
    data3.memo = '預設自動產生'

    this.containerApi.checkExists(data.container_type, data.container_no).then(bool => {
      if (!bool){
        this._add(data)
      }
    })
    this.containerApi.checkExists(data2.container_type, data2.container_no).then(bool => {
      if (!bool){
        this._add(data2)
      }
    })
    this.containerApi.checkExists(data3.container_type, data3.container_no).then(bool => {
      if (!bool){
        this._add(data3)
      }
    })
  }

  get(container_type: string, container_no: string){
    return this.containerApi.get(container_type, container_no)
  }

  getList(){
    let result = new SubmitResultWithData<any>()
    return new Promise<SubmitResultWithData<any>>((resolve, reject) => {

      let p1 = this.containerTypeApi.getList()
      let p2 = this.containerApi.getList()
      let p3 = this.containerLocationService.getList()
      let p4 = this.containerImgsService.getImgListAll()
      Promise.all([p1, p2, p3, p4]).then(values => {
        let container_type_list = values[0]
        let container_list = values[1]
        let container_loc_list = values[2]
        let container_imgs_list = values[3]

        let map = container_list.map(item => {
          let row: any = {}

          let cotainer_code = item.container_type + item.container_no

          let container_type = container_type_list.find(o => o.container_type == item.container_type)
          let container_loc = ContainerLocationApi.getLocation(container_loc_list, cotainer_code)
          let container_imgs = container_imgs_list.filter(o => o.container == cotainer_code)

          row.container_type = item.container_type
          row.container_type_name = container_type?.container_type_name
          row.container_no = item.container_no
          row.memo = item.memo
          row.ime01 = container_loc?.ime01
          row.ime02 = container_loc?.ime02
          row.container_imgs_count = container_imgs.length

          return row
        })

        result.succ = true
        result.data = map

        resolve(result)
      })

    })
  }

  checkExists(data: Container) {
    return new Promise<boolean>((resolve, reject) => {
      let result = new SubmitResult()
      this.containerApi.checkExists(data.container_type, data.container_no).then(bool => {
        resolve(bool)
      })
    })
  }

  /**
   * 
   * @param container_code 
   * @returns [container_type, container_no]
   */
  parseContainerCode(container_code: string){
    if (StringUtil.IsNullOrWhiteSpace(container_code)){
      return ['', '']
    }

    let container_type = container_code[0]
    let container_no = container_code.slice(1)

    return [container_type, container_no]
  }

  checkExistsByCode(container_code: string) {
    return new Promise<boolean>((resolve, reject) => {
      let result = new SubmitResult()
      let parse = this.parseContainerCode(container_code)
      this.containerApi.checkExists(parse[0], parse[1]).then(bool => {
        resolve(bool)
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

  private checkExistsWhenAdd(data: Container) {
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
  

  

  update(data: Container){
    let _validateUpdateHandler = new checkHandler<Container>(this.validateUpdate.bind(this))
    let _checkExistsHandler = new checkHandler<Container>(this.checkExistsWhenUpdate.bind(this))
    let _updateHandler = new checkHandler<Container>(this._update.bind(this))

    _validateUpdateHandler.setNext(_checkExistsHandler)
    _checkExistsHandler.setNext(_updateHandler)

    return _validateUpdateHandler.handleFunc(data)
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

  private checkExistsWhenUpdate(data: Container) {
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

  getImgsInfoList(container: string) {
    return new Promise<any[]>((resolve, reject) => {
      let result: any[] = []

      let p1 = this.containerImgsService.getImgsList(container)
      let p2 = this.imgsFileService.getList()

      Promise.all([p1, p2]).then(values => {
        let imgs_list = values[0]
        let imgs_file_list = values[1]

        let map = imgs_list.map(container_imgs => {
          var row: any = {}

          let imgs_file = imgs_file_list.find(o => o.IMGS06 == container_imgs.RVBS04)

          row.RVBS04 = container_imgs.RVBS04
          row.TA_RVBS14 = container_imgs.TA_RVBS14
          row.ime02 = imgs_file?.IMGS03

          return row
        })

        resolve(map)
      })

      
    })
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
              result.container_IMGS03 = loc?.ime02
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
              result.container_IMGS03 = loc?.ime02
            }

            resolve(result)
          })
        } else {
          resolve(undefined)
        }
      })

    })
  }

  updateIME02(container: string, ime02: string) {
    return this.containerLocationService.updateIMGS03(container, GlobalParams.warehouse, ime02)
  }

  updateContainerImgs(data: ContainerImgs[]){
    return this.containerImgsService.update(data)
  }

  moveImgs(from_container:string, to_container:string){
    return this.containerImgsService.changeContainer(from_container, to_container)
  }

  
}



