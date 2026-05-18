import { Injectable } from '@angular/core';
import { ContainerImgs } from '../@models/ContainerImgs';
import { SubmitResult } from '../@models/SubmitResult';
import { ContainerType } from '../@models/ContainerType';
import { Container } from '../@models/Container';

@Injectable({
  providedIn: 'root',
})

export class ContainerApi {
  readonly localStorageKey = 'Container'

  get _data(): Container[] {
    let json = localStorage.getItem(this.localStorageKey) as string
    if (json) {
      return JSON.parse(json) as Container[]
    }
    return []
  }

  get(container_type: string, container_no: string){
    return new Promise<Container | undefined>((resolve, reject) => {
        let data = this._data.find(row => row.container_type == container_type && row.container_no == container_no)
        resolve(data)
    })
  }

  getByCode(container_code: string){
    return new Promise<Container | undefined>((resolve, reject) => {
        let data = this._data.find(row => row.container_type + row.container_no == container_code)
        resolve(data)
    })
  }

  getList(){
    return new Promise<Container[]>((resolve, reject) => {
        resolve(this._data)
    })
  }

  add(data: Container) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let _data = this._data
        _data.push(data)
        this._update(_data)

        resolve(true)

      }, 500)

    })
  }

  update(data: Container) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let _data = this._data

        let findIndex = _data.findIndex(row => row.container_type === data.container_type && row.container_no == data.container_no)
        if (findIndex != -1) {
          _data[findIndex] = data
          this._update(_data)
        }

        resolve(true)
      }, 500)

    })
  }

  delete(container_type: string, container_no: string){
    return new Promise((resolve, reject) => {
      this._delete(container_type, container_no)
      resolve(true)
    })
  }

  checkExists(container_type: string, container_no: string){
    return new Promise<boolean>((resolve, reject) => {
      let findIndex = this._data.findIndex(row => row.container_type == container_type && row.container_no == container_no)
      resolve(findIndex != -1)
    })
  }


  private _delete(container_type: string, container_no: string){
    let _data = this._data
    _data = _data.filter(row => row.container_type != container_type && row.container_no != container_no)

    let json = JSON.stringify(_data)
    localStorage.setItem(this.localStorageKey, json)
  }

  private _update(data: Container[]) {
      return new Promise<SubmitResult>((resolve, reject) => {
        let result = new SubmitResult()
  
        let _data = this._data
  
        for (let row of data) {
          let _row: any = Object.assign(new Container(), row)

          Object.keys(_row).forEach(key => {
            if (_row[key] === undefined || _row[key] === null){
              _row[key] = ''
            }
          })

          let findIndex = _data.findIndex(_row => _row.container_type === row.container_type && _row.container_no == row.container_no)
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

}
