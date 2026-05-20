import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../@models/UserRole';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_href = document.baseURI

  constructor(private http: HttpClient){
    
  }

  get(account: string){
    return new Promise<UserRole | undefined>((resolve) => {
      this.http.get(this.base_href + 'userRole.json').subscribe((res: any) => {
        resolve(res.data.find((item: UserRole) => item.account === account))
      })
    })
  }

  getList(){
    return new Promise<any[]>((resolve, reject) => {
      forkJoin([
        this.http.get(this.base_href + 'userRole.json'),
        this.http.get(this.base_href + 'login.json')
      ]
      ).subscribe(results => {
        let userRoles: any[] = (results[0] as any).data
        let logins: any[] = (results[1] as any).data

        let data = userRoles.map((userRole: any) => {
          let row: any = {}

          let login = logins.find(o => o.account == userRole.account)

          row.account = userRole.account
          row.password = login?.password
          row.role_code = userRole.role_code

          return row
        })

        resolve(data)
      })

    })
  }

}
