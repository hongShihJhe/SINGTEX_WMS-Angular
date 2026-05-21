import { AuthService } from '../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  standalone: true,
  selector: 'app-csfi514',
  imports: [RouterLink],
  templateUrl: './csfi514.html',
  styleUrl: './csfi514.scss',
})

export class Csfi514 extends BasePDAMenuComponent implements OnInit, AfterViewChecked{
  PDAFunctionDataRef = PDAFunctionData

  override permission: any = {
    'csfi5140': false,
    'csfi5141': false,
    'csfi5142': false,
    'csfi5143': false,
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
