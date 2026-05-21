import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  standalone: true,
  selector: 'app-aimt324',
  imports: [RouterLink],
  templateUrl: './aimt324.html',
  styleUrl: './aimt324.scss',
})

export class Aimt324 extends BasePDAMenuComponent implements OnInit, AfterViewChecked{
  PDAFunctionDataRef = PDAFunctionData

  override permission: any = {
    'aimt3240': false,
    'aimt3241': false,
    'aimt3242': false,
    'aimt3243': false,
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
