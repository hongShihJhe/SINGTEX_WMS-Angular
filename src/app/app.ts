import { ContainerService } from './@services/container-service';
import { ContainerTypeService } from './@services/container-type-service';
import { Renderer2, Component, OnInit, signal, Inject, DOCUMENT } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBar } from "./@shared/progress-bar/progress-bar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('SINGTEX_WMS');

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private containerTypeService: ContainerTypeService,
    private containerService: ContainerService
  ) { 
  }

  ngOnInit(): void {
    // AlertStatic.setObject(new SweetAlert2Util())

    this.containerTypeService.feedData()
    this.containerService.feedData()
  }

  // loadScripts() {
  //   this.addScript("/jquery-3.3.1.min.js")
  //   this.addScript("/bootstrap-4.1.3.min.js")
  //   this.addScript("/sb-admin-2/vendor/datatables/jquery.dataTables.min.js")
  //   this.addScript("/sb-admin-2/vendor/datatables/dataTables.bootstrap4.min.js")
  // }

  // addScript(src:string){
  //   let script = this._renderer2.createElement('script');
  //   script.src = src
  //   this._renderer2.appendChild(this._document.head, script);
  // }

}
