import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../@models/UserRole';

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
    return new Promise<UserRole[]>((resolve) => {
      this.http.get(this.base_href + 'userRole.json').subscribe((res: any) => {
        resolve(res.data)
      })
    })
  }

}
