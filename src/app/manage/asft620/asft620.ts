import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  standalone: true,
  selector: 'app-asft620',
  imports: [RouterLink],
  templateUrl: './asft620.html',
  styleUrl: './asft620.scss',
})

export class Asft620 extends BasePDAMenuComponent implements OnInit, AfterViewChecked{
  PDAFunctionDataRef = PDAFunctionData

  override permission: any = {
    'asft6200': false,
    'asft6201': false,
    'asft6202': false,
    'asft6203': false,
    'asft6204': false,
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
