import { AuthService } from './../../@services/auth-service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FuncNames } from '../../@models/FuncNames';
import { RouterLink } from "@angular/router";
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home extends BasePDAMenuComponent implements OnInit, AfterViewChecked {
  
  PDAFunctionDataRef = PDAFunctionData
  
  override permission = {
    "cimt302a": false,
    "aimt324": false,
    "csfi514": false,
    "asft620": false,
    "asft700": false,
    "search": false,
    "csfi301": false,
  }

  constructor(private authService:  AuthService){
    super(authService);
  }

  ngOnInit(): void {
    this.setPermissionByParent()
  }

  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }
 
}
