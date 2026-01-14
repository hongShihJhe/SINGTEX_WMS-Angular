import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-menu',
  imports: [RouterLink],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.scss',
})
export class AdminMenu {

}
