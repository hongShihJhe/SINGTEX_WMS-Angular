import { AuthService } from './../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  standalone: true,
  selector: 'app-cimt302a',
  imports: [RouterLink],
  templateUrl: './cimt302a.html',
  styleUrl: './cimt302a.scss',
})

export class Cimt302a extends BasePDAMenuComponent implements OnInit, AfterViewChecked{
  PDAFunctionDataRef = PDAFunctionData

  override permission: any = {
    "cimt302a0": false,
    "cimt302a1": false,
    "cimt302a2": false,
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
