import { ContainerTypeValidatorCodes } from './../@validators/ContainerTypeValidatorCodes';
import { ContainerTypeValidator } from './../@validators/container-type-validator';
import { Injectable } from '@angular/core';
import { ContainerTypeApi } from '../@apis/container-type-api';
import { ContainerType } from '../@models/ContainerType';
import { SubmitResult, SubmitResultWithData } from '../@models/SubmitResult';

@Injectable({
  providedIn: 'root',
})

export class ContainerTypeService {
  constructor(private containerTypeApi: ContainerTypeApi, private containerTypeValidator: ContainerTypeValidator){

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
    return new Promise<SubmitResult>((resolve, reject) => {
      var result = new SubmitResult()

      let validate = this.containerTypeValidator.validateAdd(data)
      if (!validate.succ){
        result.succ = false
        result.code = validate.code
        result.message = validate.message
        resolve(result)

        return
      }

      this.containerTypeApi.checkExists(data.container_type).then(bool => {
        if (bool){
          result.succ = false
          result.code = ContainerTypeValidatorCodes.D001
          result.message = 'data already exists'
          resolve(result)
        }
        else{
          this.containerTypeApi.add(data).then(res => {
            result.succ = true
            result.message = ''
            resolve(result)

          })
          .catch(reject)
        }
      })
    })
  }

  update(data: ContainerType){
    return new Promise<SubmitResult>((resolve, reject) => {
      var result = new SubmitResult()

      var result = new SubmitResult()

      let validate = this.containerTypeValidator.validateUpdate(data)
      if (!validate.succ){
        result.succ = false
        result.code = validate.code
        result.message = validate.message
        resolve(result)

        return
      }

      this.containerTypeApi.checkExists(data.container_type).then(bool => {
        if (!bool){
          result.succ = false
          result.code = ContainerTypeValidatorCodes.D000
          result.message = 'data not exists'
          resolve(result)
        }
        else{
          this.containerTypeApi.update(data).then(res => {
            result.succ = true
            result.message = ''
            resolve(result)
          })
          .catch(reject)
        }
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

  checkExists(container_type: string){
    return this.containerTypeApi.checkExists(container_type)
  }


}
