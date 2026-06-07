import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from '../../@shared/scan-modal/scan-modal';
import { FormsModule } from '@angular/forms';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';

@Component({
  standalone: true,
  selector: 'app-asft7003',
  imports: [ScanModal, FormsModule],
  templateUrl: './asft7003.html',
  styleUrl: './asft7003.scss',
})

export class Asft7003 implements OnInit, AfterViewInit {
  pageLength = 50
  inputA01?: string
  inputA02?: string
  inputA03?: string


  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal
  @ViewChild('A02Modal') A02Modal!: ScanModal
  @ViewChild('A03Modal') A03Modal!: ScanModal
  @ViewChild('scanModal') scanModal!: ScanModal

  constructor(@Inject(IAlertToken) private _IAlert: IAlert,) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


  A01ModalShow() {
    this.A01Modal.show()
  }

  A02ModalShow() {
    this.A02Modal.show()
  }

  A03ModalShow() {
    this.A02Modal.show()
  }

  scanModalShow() {
    this.scanModal.show()
  }

  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA01 = value
    this.fetchData(value)
  }

  fetchData(inb01: string) {

  }

  A02ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA02 = value
  }

   A03ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA03 = value
  }


  cancelConfirmedRow(row: any) {
    let rowData = row.data()
    rowData._confirm = ''
    rowData.container = ''
    row.data(rowData).draw()

    let node = row.node()
    $(node).removeClass('scanned')
  }

  submit() {
    this._IAlert.Confirm('確認要點收嗎?', () => {
      
    })
  }

  clear() {
    this.inputA01 = ''
    this.inputA02 = ''
  }

}
