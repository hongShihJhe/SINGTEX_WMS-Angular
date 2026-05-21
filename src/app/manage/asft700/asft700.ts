import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  standalone: true,
  selector: 'app-asft700',
  imports: [RouterLink],
  templateUrl: './asft700.html',
  styleUrl: './asft700.scss',
})

export class Asft700 extends BasePDAMenuComponent implements OnInit, AfterViewChecked{
  PDAFunctionDataRef = PDAFunctionData

  override permission: any = {
    'asft7000': false,
    'asft7001': false,
    'asft7002': false,
    'asft7003': false,
  }

  constructor(private authService: AuthService){
    super(authService)
  }

  ngOnInit(): void {
    this.setPermission()
  }

  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }

}
