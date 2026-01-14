import { AuthService } from './../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-cimt302a',
  imports: [RouterLink],
  templateUrl: './cimt302a.html',
  styleUrl: './cimt302a.scss',
})

export class Cimt302a implements OnInit, AfterViewChecked{
  prg_names = FuncNames
  menu_icon_size = '50'

  cimt302a0_permission = false
  cimt302a1_permission = false
  cimt302a2_permission = false

  constructor(private authService: AuthService){

  }

  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }

  ngOnInit(): void {
     this.authService.hasPermission('cimt302a0').then(res => {
      this.cimt302a0_permission = res
     })
     this.authService.hasPermission('cimt302a1').then(res => {
      this.cimt302a1_permission = res
     })
     this.authService.hasPermission('cimt302a2').then(res => {
      this.cimt302a2_permission = res
     })
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
