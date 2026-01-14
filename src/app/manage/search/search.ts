import { AuthService } from './../../@services/auth-service';
import { RouterLink } from '@angular/router';
import { FuncNames } from '../../@models/FuncNames';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})

export class Search implements OnInit, AfterViewChecked {
  prg_names = FuncNames
  menu_icon_size = '50'

  search_container_auth = false
  search_imgs_auth = false

  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
    this.authService.hasPermission('search_container').then(res => {
      this.search_container_auth = res
    })
    this.authService.hasPermission('search_imgs').then(res => {
      this.search_imgs_auth = res
    })
  }

  ngAfterViewChecked(): void {
    this.set_menu_icon_size()
  }

  set_menu_icon_size() {
    document.querySelectorAll('svg').forEach(el => {
      el.setAttribute('width', this.menu_icon_size)
      el.setAttribute('height', this.menu_icon_size)
    })
  }
}
