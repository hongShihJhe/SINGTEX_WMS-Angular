import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  status = 'start';
  show = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.show = true;
        this.status = 'p80';
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.status = 'end';
        setTimeout(() => {
          this.status = 'start';
          this.show = false;
          this.cdr.markForCheck()
        }, 300);

        window.scrollTo(0, 0);
      });
  }
}
