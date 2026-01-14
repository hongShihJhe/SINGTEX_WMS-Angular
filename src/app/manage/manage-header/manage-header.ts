import { breadcrumb_item } from '../../@models/breadcrumb_item';
import { AuthService } from '../../@services/auth-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../@services/breadcrumb-service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  standalone: true,
  selector: 'app-manage-header',
  imports: [RouterLink],
  templateUrl: './manage-header.html',
  styleUrl: './manage-header.scss',
})

export class ManageHeader implements OnInit, OnDestroy {

  user = ''
  role_code = ''
  isAdmin = false
  subscription?: Subscription;


  breadcrumbList_default: breadcrumb_item[] = [ new breadcrumb_item('/manage', '主選單') ]
  breadcrumbList: breadcrumb_item[] = [...this.breadcrumbList_default]

  constructor(
    private router: Router, 
    private breadcrumbService: BreadcrumbService, 
    private route: ActivatedRoute, 
    private authService: AuthService
  ) 
  {
    
  }

  ngOnInit(): void {
    this.user = this.authService.user?.account as string
    this.role_code = this.authService.user?.roles[0] as string
    this.subscription = this.breadcrumbService.breadcrumb$.subscribe(data => {
        if (data && data.length > 0){
          this.breadcrumbList = data
        } else {
          this.breadcrumbList = this.breadcrumbList_default
        }
    })

    this.isAdmin = this.authService.isAdmin()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }
}
