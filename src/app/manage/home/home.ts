import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FuncNames } from '../../@models/FuncNames';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewChecked {
  
  prg_names = FuncNames

  menu_icon_size = '50'

  ngOnInit(): void {
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
