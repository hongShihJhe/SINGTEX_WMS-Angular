import { ContainerTypeValidatorCodes } from './../@validators/ContainerTypeValidatorCodes';
import { ContainerTypeValidator } from './../@validators/container-type-validator';
import { Injectable } from '@angular/core';
import { ContainerTypeApi } from '../@apis/container-type-api';
import { ContainerType } from '../@models/ContainerType';
import { SubmitResult, SubmitResultWithData } from '../@models/SubmitResult';
import { checkHandler } from '../@models/checkHandler';

@Injectable({
  providedIn: 'root',
})

export class ContainerTypeService {
  constructor(private containerTypeApi: ContainerTypeApi, private containerTypeValidator: ContainerTypeValidator){

  }

  feedData(){
    let data = new ContainerType()
    data.container_type = 'A'
    data.container_type_name = 'A類型'
    data.memo = '預設自動產生'

    this.containerTypeApi.checkExists(data.container_type).then(bool => {
      if (!bool){
        this._add(data)
      }
    })
  }

  getList(){
    return new Promise<SubmitResultWithData<ContainerType[]>>((resolve, reject) => {
      var result = new SubmitResultWithData<ContainerType[]>() 
      this.containerTypeApi.getList().then(data => {
        result.succ = true
        result.data = data
        resolve(result)
      }).catch(reject)
    })
  }

  createAddFunc(){
    return this.add.bind(this)
  }



  add(data: ContainerType){
    let validateHandler = new checkHandler(this.validateAdd.bind(this))
    let checkExistsHandler = new checkHandler(this.checkExistsWhenAdd.bind(this))
    let addHandler = new checkHandler(this._add.bind(this))

    validateHandler.setNext(checkExistsHandler)
    checkExistsHandler.setNext(addHandler)

    return validateHandler.handleFunc(data)
  }

  validateAdd(data: ContainerType){
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let validateResult = this.containerTypeValidator.validateAdd(data)
      if (!validateResult.succ){
        result.succ = false
        result.code = validateResult.code
        result.message = validateResult.message
      }

      resolve(result)
    })
  }
  
  private checkExistsWhenAdd(data: ContainerType) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()
      this.containerTypeApi.checkExists(data.container_type).then(bool => {
        if (bool) {
          result.succ = false
          result.code = ContainerTypeValidatorCodes.D001
          result.message = 'data already exists'
        }
        resolve(result)
      })
    })
  }

  private _add(data: ContainerType){
    return new Promise<SubmitResult>((resolve, reject) => {
      this.containerTypeApi.add(data).then(res => {
        let result = new SubmitResult()
        result.succ = true
        result.message = ''
        resolve(result)
      })
    })
  }


  update(data: ContainerType){
    let validateHandler = new checkHandler(this.validateUpdate.bind(this))
    let checkUpdateHandler = new checkHandler(this.checkExistsWhenUpdate.bind(this))
    let updateHandler = new checkHandler(this._update.bind(this))

    validateHandler.setNext(checkUpdateHandler)
    checkUpdateHandler.setNext(updateHandler)

    return validateHandler.handleFunc(data)
  }

  validateUpdate(data: ContainerType){
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let validateResult = this.containerTypeValidator.validateUpdate(data)
      if (!validateResult.succ){
        result.succ = false
        result.code = validateResult.code
        result.message = validateResult.message
      }

      resolve(result)
    })
  }

  private checkExistsWhenUpdate(data: ContainerType) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()
      this.containerTypeApi.checkExists(data.container_type).then(bool => {
        if (!bool) {
          result.succ = false
          result.code = ContainerTypeValidatorCodes.D000
          result.message = 'data already exists'
        }
        resolve(result)
      })
    })
  }

  private _update(data: ContainerType) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()
      this.containerTypeApi.update(data).then(res => {
        result.succ = true
        result.message = ''
        resolve(result)
      })
    })
  }


  delete(container_type: string){
    var result = new SubmitResult()
    return new Promise<SubmitResult>((resolve, reject) => {
      this.containerTypeApi.delete(container_type).then(res => {
        result.succ = true
        resolve(result)
      })
      .catch(reject)
    })
  }

  

}
