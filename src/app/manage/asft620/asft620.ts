import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-asft620',
  imports: [RouterLink],
  templateUrl: './asft620.html',
  styleUrl: './asft620.scss',
})

export class Asft620 implements OnInit, AfterViewChecked{
  prg_names = FuncNames
  menu_icon_size = '50'

  auth_asft6200 = true
  auth_asft6201 = true
  auth_asft6202 = true
  auth_asft6203 = true
  auth_asft6204 = true

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
