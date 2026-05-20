import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cimt302a } from '../@models/Cimt302a';
import { SubmitResult } from '../@models/SubmitResult';

@Injectable({
  providedIn: 'root',
})

export class Cimt302aApi {
  private base_href = document.baseURI
  readonly localStorageKey = 'cimt302a'

  get _data(): Cimt302a[] {
    let json = localStorage.getItem(this.localStorageKey) as string
    if (json){
      return JSON.parse(json) as Cimt302a[]
    }
    return []
  }

  constructor(private http: HttpClient,) {
  }

  /**
   * 取得待點收資料
   * @param inb01 
   * @returns 
   */
  getListByINB01(inb01: string) {
    return new Promise<Cimt302a[]>((resolve, reject) => {
      this.http.get(this.base_href + 'cimt302a0.json').subscribe((res: any) => {
        resolve(res.data.filter((row: Cimt302a) => row.INB01 === inb01))
      })
    })
  }

  /**
   * 取得已點收未上架資料
   * @param container 
   */
  getOutListByContainer(container: string) {
    return new Promise<Cimt302a[]>((resolve, reject) => {
      resolve(this._data.filter(row => row.container === container && row.out_ts && !row.in_ts))
    })
  }

  /**
   * 取得已點收未上架資料
   * @returns 
   */
  getOutList() {
    return new Promise<Cimt302a[]>((resolve, reject) => {
      resolve(this._data.filter(row => row.out_ts && !row.in_ts))
    })
  }


  update(data: Cimt302a[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      setTimeout(() => {

        let result = new SubmitResult()

        let _data = this._data

        for (let row of data) {
          let _row = Object.assign(new Cimt302a(), row)

          let findIndex = _data.findIndex(row => _row.INB01 === row.INB01 && _row.RVBS04 === row.RVBS04)
          if (findIndex != -1) {
            _data[findIndex] = _row
          } else {
            _data.push(_row)
          }
        }

        let json = JSON.stringify(_data)
        localStorage.setItem(this.localStorageKey, json)

        resolve(result)

      }, 500)
      
    })
  }

}
