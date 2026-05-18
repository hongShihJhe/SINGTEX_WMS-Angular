import { Injectable } from '@angular/core';
import { ContainerImgs } from '../@models/ContainerImgs';
import { SubmitResult } from '../@models/SubmitResult';
import { ContainerLocation } from '../@models/ContainerLocation';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';

@Injectable({
  providedIn: 'root',
})


export class ContainerLocationApi {
  readonly localStorageKey_location = 'container_location'

  getLocation(container: string) {
    return new Promise<ContainerLocation | undefined>((resolve, reject) => {
      let json = localStorage.getItem(this.localStorageKey_location) as string
      let data = JSON.parse(json) as ContainerLocation[] || []

      resolve(data.find(row => row.container == container))
    })
  }

  updateIMGS03(container: string, imgs03: string) {
    var o = new ContainerLocation()
    o.container = container
    o.IMGS03 = imgs03
    return this.update([o])
  }

  update(data: ContainerLocation[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data: ContainerLocation[] = []
      let _json = localStorage.getItem(this.localStorageKey_location)
      if (_json) {
        _data = JSON.parse(_json)
      }

      for (let row of data) {
        let _row = Object.assign(new ContainerLocation(), row)

        let findIndex = _data.findIndex(_row => _row.container === row.container)
        if (findIndex != -1) {
          _data[findIndex] = _row
        } else {
          _data.push(_row)
        }
      }

      let json = JSON.stringify(_data)
      localStorage.setItem(this.localStorageKey_location, json)

      resolve(result)
    })
  }

}



