import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminMenu } from "./admin-menu/admin-menu";

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, AdminMenu],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

}
