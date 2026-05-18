import { Injectable } from '@angular/core';
import { ContainerImgs } from '../@models/ContainerImgs';
import { SubmitResult } from '../@models/SubmitResult';
import { ContainerLocation } from '../@models/ContainerLocation';
import { ContainerImgsInfo } from '../@models/ContainerImgsInfo';

@Injectable({
  providedIn: 'root',
})


export class ContainerImgsApi {
  readonly localStorageKey = 'container_imgs'

  get _data(): ContainerImgs[] {
    let json = localStorage.getItem(this.localStorageKey) as string
    if (json) {
      return JSON.parse(json) as ContainerImgs[]
    }
    return []
  }

  getImgsByRVBS04(value: string) {
    return new Promise<ContainerImgs | undefined>((resolve, reject) => {
      resolve(this._data.find(row => row.RVBS04 == value))
    })
  }

  getImgsByTA_RVBS14(value: string) {
    return new Promise<ContainerImgs | undefined>((resolve, reject) => {
      resolve(this._data.find(row => row.TA_RVBS14 == value))
    })
  }

  getImgsByRVBS04OrTA_RVBS14(value: string){
    return new Promise<ContainerImgs | undefined>((resolve, reject) => {
      this.getImgsByRVBS04(value).then(data => {
        if (data){
          resolve(data)
        } else {
          this.getImgsByTA_RVBS14(value).then(data2 => {
            if (data2){
              resolve(data2)
            } else {
              resolve(undefined)
            }
          })
        }
      })
    })
  }

  getImgsList(container: string) {
    return new Promise<ContainerImgs[]>((resolve, reject) => {
      resolve(this._data.filter(row => row.container == container))
    })
  }


  update(data: ContainerImgs[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data = this._data

      for (let row of data) {
        let _row = Object.assign(new ContainerImgs(), row)

        let findIndex = _data.findIndex(_row => _row.RVBS04 === row.RVBS04)
        if (findIndex != -1) {
          _data[findIndex] = _row
        } else {
          _data.push(_row)
        }
      }

      let json = JSON.stringify(_data)
      localStorage.setItem(this.localStorageKey, json)

      resolve(result)
    })
  }

  changeContainer(from_container: string, to_container: string) {
    return new Promise<SubmitResult>((resolve, reject) => {
      this.getImgsList(from_container).then(imgsList => {
        if (imgsList.length) {
          for (let item of imgsList) {
            item.container = to_container
          }
          this.update(imgsList).then(res => {
            resolve(res)
          })
        }
      })
    })


  }



}



