import { LoginResult } from './../@models/LoginResult';
import { AuthService } from './../@services/auth-service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  Account?: string = ''
  Password?: string = ''
  RememberMe?: boolean

  private localStorageKey = 'loginRememberMe'

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.rememberMe()
  }

  login() {
    if (!this.Account || !this.Password) {
      alert('請輸入帳號和密碼')
      return
    }

    this.authService.login(this.Account, this.Password).then(res => {
      if (res.succ){
        this.router.navigateByUrl("/manage")
        this.setRememberMe()
      } else {
        alert(res.message)
      }
    })
  }

  rememberMe() {
    let remember = localStorage.getItem(this.localStorageKey)
    if (remember) {
      let oRemember: any = JSON.parse(remember)
      this.Account = oRemember.Account
      this.RememberMe = oRemember.RememberMe
    }
  }

  setRememberMe() {
    if (this.RememberMe) {
      let data = {
        Account: this.Account,
        RememberMe: this.RememberMe
      }

      localStorage.setItem(this.localStorageKey, JSON.stringify(data))
    } else {
      localStorage.removeItem(this.localStorageKey)
    }
  }

}
