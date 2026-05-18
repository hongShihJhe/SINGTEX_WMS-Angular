import { Injectable } from '@angular/core';
import { ContainerType } from '../@models/ContainerType';
import { StringUtil } from '../@utils/StringUtil';
import { ValidateResult } from '../@models/ValidateResult';
import { ContainerTypeValidatorCodes } from './ContainerTypeValidatorCodes';

@Injectable({
  providedIn: 'root',
})

export class ContainerTypeValidator {

  validateAdd(data: ContainerType){
    var result = new ValidateResult()
    
    if (StringUtil.IsWhiteOrSpace(data.container_type) || StringUtil.IsWhiteOrSpace(data.container_type_name)){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M000
      result.message = 'container_type or container_type_name is null or whitespace'
    }
    else if (data.container_type.length > 1){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M001
      result.message = 'the length of container_type exceeds 1'
    }
    else if (data.container_type_name.length > 10){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M002
      result.message = 'the length of container_type_name exceeds 10'
    }
    else if (data.memo && data.memo.length > 50){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M003
      result.message = 'the length of memo exceeds 50'
    }
    
    return result
  }

  validateUpdate(data: ContainerType){
    var result = new ValidateResult()
    
    if (StringUtil.IsWhiteOrSpace(data.container_type) || StringUtil.IsWhiteOrSpace(data.container_type_name)){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M000
      result.message = 'container_type or container_type_name is null or whitespace'
    }
    else if (data.container_type.length > 1){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M001
      result.message = 'the length of container_type exceeds 1'
    }
    else if (data.container_type_name.length > 10){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M002
      result.message = 'the length of container_type_name exceeds 10'
    }
    else if (data.memo && data.memo.length > 50){
      result.succ = false
      result.code = ContainerTypeValidatorCodes.M003
      result.message = 'the length of memo exceeds 50'
    }
    
    return result
  }


}
