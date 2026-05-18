import { Injectable } from '@angular/core';
import { ContainerType } from '../@models/ContainerType';
import { StringUtil } from '../@utils/StringUtil';
import { ValidateResult } from '../@models/ValidateResult';
import { ContainerTypeValidatorCodes } from './ContainerTypeValidatorCodes';
import { Container } from '../@models/Container';
import { ContainerValidatorCodes } from './ContainerValidatorCodes';
import { ValidateUtil } from '../@utils/ValidateUtil';

@Injectable({
  providedIn: 'root',
})

export class ContainerValidator {

  validateAdd(data: Container){
    var result = new ValidateResult()
    if (StringUtil.IsWhiteOrSpace(data.container_type) || StringUtil.IsWhiteOrSpace(data.container_no)){
      result.succ = false
      result.code = ContainerValidatorCodes.M000
      result.message = 'container_type or container_type_name is null or whitespace'
    }
    else if (data.container_type.length > 1){
      result.succ = false
      result.code = ContainerValidatorCodes.M001
      result.message = 'the length of container_type exceeds 1'
    }
    else if (data.container_no.length !== 3){
      result.succ = false
      result.code = ContainerValidatorCodes.M002
      result.message = 'the length of container_no must be 4'
    }
    else if (!ValidateUtil.IsOnlyNumber(data.container_no)){
      result.succ = false
      result.code = ContainerValidatorCodes.M003
      result.message = 'container_no can be only number 0-9'
    }
    else if (data.memo && data.memo.length > 50){
      result.succ = false
      result.code = ContainerValidatorCodes.M004
      result.message = 'the length of memo exceeds 50'
    }
    
    return result
  }

  validateUpdate(data: Container){
    var result = new ValidateResult()
    
    if (StringUtil.IsWhiteOrSpace(data.container_type) || StringUtil.IsWhiteOrSpace(data.container_no)){
      result.succ = false
      result.code = ContainerValidatorCodes.M000
      result.message = 'container_type or container_type_name is null or whitespace'
    }
    else if (data.container_type.length > 1){
      result.succ = false
      result.code = ContainerValidatorCodes.M001
      result.message = 'the length of container_type exceeds 1'
    }
    else if (data.container_no.length !== 3){
      result.succ = false
      result.code = ContainerValidatorCodes.M002
      result.message = 'the length of container_no must be 4'
    }
    else if (!ValidateUtil.IsOnlyNumber(data.container_no)){
      result.succ = false
      result.code = ContainerValidatorCodes.M003
      result.message = 'container_no can be only number 0-9'
    }
    else if (data.memo && data.memo.length > 50){
      result.succ = false
      result.code = ContainerValidatorCodes.M004
      result.message = 'the length of memo exceeds 50'
    }

    return result
  }


}
