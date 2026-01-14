import { IMGS_FILE } from './../@models/IMGS_FILE';
import { Injectable } from '@angular/core';
import { TransferItem } from '../@models/TransferItem';
import { GlobalParams } from '../@models/GlobalParams';
import { SubmitResult } from '../@models/SubmitResult';

@Injectable({
  providedIn: 'root',
})
export class ImgsFileService {
  readonly localStorageKey = 'imgs_file'

  get _data(): IMGS_FILE[] {
    let json = localStorage.getItem(this.localStorageKey) as string
    if (json) {
      return JSON.parse(json) as IMGS_FILE[]
    }
    return []
  }


  constructor() {
    if (!this._data.length) {
      this.feedData()
    }
  }

  getImgsFile(imgs06: string) {
    return new Promise<IMGS_FILE | undefined>((resolve, reject) => {
      resolve(this._data.find(item => item.IMGS06 === imgs06))
    })
  }

  getImgsFileByList(imgs06List: string[]) {
    return new Promise<(IMGS_FILE | undefined)[]>((resolve, reject) => {
      let data = this._data.filter(item => imgs06List.includes(item.IMGS06))
      let result = imgs06List.map(item => data.find(o => o.IMGS06 == item))
      resolve(result)
    })
  }

  transfer(data: TransferItem[]) {
    return new Promise((resolve, reject) => {
      let _data = this._data

      for (let item of data) {
        let find = _data.find(_item => _item.IMGS06 === item.RVBS04)
        if (find) {
          find.IMGS02 = GlobalParams.warehouse
          find.IMGS03 = item.IMG03
        }
      }

      this.update(_data)

      resolve(true)
    })
  }

  update(data: IMGS_FILE[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data = this._data
      for (let row of data) {
        let _row = Object.assign(new IMGS_FILE(), row)
        let findIndex = _data.findIndex(_row => _row.IMGS06 === row.IMGS06)
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

  private feedData() {

    let _data = this._data

    var a01 = new IMGS_FILE()
    a01.IMGS01 = 'PN001'
    a01.IMGS02 = GlobalParams.warehouse
    a01.IMGS03 = 'S01'
    a01.IMGS04 = 'PO2601130001'
    a01.IMGS06 = 'A251207001'
    a01.IMGS07 = 'KG'
    a01.IMGS08 = 10
    var a02 = new IMGS_FILE()
    a02.IMGS01 = 'PN002'
    a02.IMGS02 = GlobalParams.warehouse
    a02.IMGS03 = 'S01'
    a02.IMGS04 = 'PO2601130001'
    a02.IMGS06 = 'A251207002'
    a02.IMGS07 = 'KG'
    a02.IMGS08 = 20
    var a03 = new IMGS_FILE()
    a03.IMGS01 = 'PN003'
    a03.IMGS02 = GlobalParams.warehouse
    a03.IMGS03 = 'S01'
    a03.IMGS04 = 'PO2601130001'
    a03.IMGS06 = 'A251207003'
    a03.IMGS07 = 'KG'
    a03.IMGS08 = 30
    var a04 = new IMGS_FILE()
    a04.IMGS01 = 'PN004'
    a04.IMGS02 = GlobalParams.warehouse
    a04.IMGS03 = 'S01'
    a04.IMGS04 = 'PO2601130002'
    a04.IMGS06 = 'A251207004'
    a04.IMGS07 = 'KG'
    a04.IMGS08 = 40
    var a05 = new IMGS_FILE()
    a04.IMGS01 = 'PN005'
    a04.IMGS02 = GlobalParams.warehouse
    a04.IMGS03 = 'S01'
    a04.IMGS04 = 'PO2601130002'
    a04.IMGS06 = 'A251207005'
    a04.IMGS07 = 'KG'
    a04.IMGS08 = 40

    this._data.push(a01)
    this._data.push(a02)
    this._data.push(a03)
    this._data.push(a04)
    this._data.push(a05)

    this.update(_data)
  }

}
