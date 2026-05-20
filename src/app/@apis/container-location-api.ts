import { Injectable } from '@angular/core';
import { ContainerImgs } from '../@models/ContainerImgs';
import { SubmitResult } from '../@models/SubmitResult';
import { ContainerLocation } from '../@models/ContainerLocation';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';

@Injectable({
  providedIn: 'root',
})


export class ContainerLocationApi {
  readonly localStorageKey = 'container_location'

  get _data(): ContainerLocation[] {
    let json = localStorage.getItem(this.localStorageKey) as string
    if (json) {
      return JSON.parse(json) as ContainerLocation[]
    }
    return []
  }

  getList(){
    return new Promise<ContainerLocation[]>((resolve, reject) => {
        resolve(this._data)
    })
  }

  static getLocation(data: ContainerLocation[], container_code: string){
    let filter = data.filter(item => item.container === container_code)

    filter.sort((a, b)=> {

      if (a.ts! > b.ts!) {
        return -1
      }
      else if (a.ts! > b.ts!){
        return -1
      }
      else{
        return 0
      }
    })

    return filter[0]
  }

  getLocation(container: string) {
    return new Promise<ContainerLocation | undefined>((resolve, reject) => {
      let json = localStorage.getItem(this.localStorageKey) as string
      let data = JSON.parse(json) as ContainerLocation[] || []
      let filter = data.filter(item => item.container === container)

      filter.sort((a, b)=> {

        if (a.ts! > b.ts!) {
          return -1
        }
        else if (a.ts! > b.ts!){
          return -1
        }
        else{
          return 0
        }
      })

      resolve(filter[0])
    })
  }

  updateIMGS03(container: string, ime01:string, ime02: string) {
    var o = new ContainerLocation()
    o.container = container
    o.ime01 = ime01
    o.ime02 = ime02
    o.ts = new Date()
    return this.update([o])
  }

  update(data: ContainerLocation[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data: ContainerLocation[] = []
      let _json = localStorage.getItem(this.localStorageKey)
      if (_json) {
        _data = JSON.parse(_json)
      }

      for (let row of data) {
        let _row = Object.assign(new ContainerLocation(), row)
        _data.push(_row)

        // let findIndex = _data.findIndex(_row => _row.container === row.container)
        // if (findIndex != -1) {
        //   _data[findIndex] = _row
        // } else {
        //   _data.push(_row)
        // }
      }

      let json = JSON.stringify(_data)
      localStorage.setItem(this.localStorageKey, json)

      resolve(result)
    })
  }

}



