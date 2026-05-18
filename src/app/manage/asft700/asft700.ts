import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-asft700',
  imports: [RouterLink],
  templateUrl: './asft700.html',
  styleUrl: './asft700.scss',
})

export class Asft700 implements OnInit, AfterViewChecked{
  prg_names = FuncNames
  menu_icon_size = '50'

  auth_asft7000 = true
  auth_asft7001 = true
  auth_asft7002 = true
  auth_asft7003 = true

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
