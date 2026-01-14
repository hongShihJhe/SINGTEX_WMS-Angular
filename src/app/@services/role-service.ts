import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../@models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private base_href = document.baseURI

  constructor(private http: HttpClient) {

  }

  get(role_code: string) {
    return new Promise<Role>((resolve, reject) => {
      this.http.get(this.base_href + 'role.json').subscribe((res: any) => {
        let data = res.data.find((item: Role) => item.role_code === role_code)

        resolve(data)
      })
    })
  }

  getList() {
    return new Promise<Role[]>((resolve, rejcet) => {
      this.http.get(this.base_href + 'role.json').subscribe((res: any) => {
        let data = res.data

        resolve(data)
      })
    })
  }

}
