import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageHeader } from "./manage-header/manage-header";
import { FuncNames } from '../@models/FuncNames';

@Component({
  standalone: true,
  selector: 'app-manage',
  imports: [RouterOutlet, ManageHeader],
  templateUrl: './manage.html',
  styleUrl: './manage.scss',
})
export class Manage implements OnInit {
  prg_names = FuncNames

  menu_icon_size = '50'

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    this.set_menu_icon_size()
  }

  set_menu_icon_size() {
    document.querySelectorAll('svg').forEach(el => {
      el.setAttribute('width', this.menu_icon_size)
      el.setAttribute('height', this.menu_icon_size)
    })
  }


}
