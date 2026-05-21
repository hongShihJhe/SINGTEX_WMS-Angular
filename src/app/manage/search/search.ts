import { AuthService } from './../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { PDAFunctionData } from '../../@models/PDAFunctionData';
import { BasePDAMenuComponent } from '../../@models/BasePDAMenuComponent';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})

export class Search extends BasePDAMenuComponent implements OnInit, AfterViewChecked {
  PDAFunctionDataRef = PDAFunctionData

  override permission: any = {
    'search0': false,
    'search1': false,
  }

  constructor(private authService: AuthService) {
    super(authService)
  }

  ngOnInit(): void {
    this.setPermission()
  }

  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }

}
