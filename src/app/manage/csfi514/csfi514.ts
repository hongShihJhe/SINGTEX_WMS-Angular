import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-csfi514',
  imports: [RouterLink],
  templateUrl: './csfi514.html',
  styleUrl: './csfi514.scss',
})

export class Csfi514 implements OnInit, AfterViewChecked{
  prg_names = FuncNames
  menu_icon_size = '50'

  auth_csfi5140 = true
  auth_csfi5141 = true
  auth_container_binding_location = true
  auth_csfi514_query = true

  constructor(private authService: AuthService){

  }

  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {

  }

  set_menu_icon_size(){
    document.querySelectorAll('svg').forEach(el => {
      el.setAttribute('width', this.menu_icon_size)
      el.setAttribute('height', this.menu_icon_size)
    })
  }


}
