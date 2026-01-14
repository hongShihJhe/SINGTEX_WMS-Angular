import { AuthService } from './../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-transfer',
  imports: [RouterLink],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss',
})

export class Transfer implements OnInit, AfterViewChecked{
  prg_names = FuncNames
  menu_icon_size = '50'

  aimt324_auth = false
  container_transfer_auth = false
  container_binding_auth = false
  container_change_auth = false
 

  constructor(private authService: AuthService){
  }
  

  ngOnInit(): void {
     this.authService.hasPermission('aimt324').then(res => {
      this.aimt324_auth = res
     })
     this.authService.hasPermission('container_transfer').then(res => {
      this.container_transfer_auth = res
     })
     this.authService.hasPermission('container_binding').then(res => {
      this.container_binding_auth = res
     })
     this.authService.hasPermission('container_change').then(res => {
      this.container_change_auth = res
     })
  }

 
  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }

  set_menu_icon_size(){
    document.querySelectorAll('svg').forEach(el => {
      el.setAttribute('width', this.menu_icon_size)
      el.setAttribute('height', this.menu_icon_size)
    })
  }
}
