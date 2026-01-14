import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-scan-modal',
  imports: [FormsModule],
  templateUrl: './scan-modal.html',
  styleUrl: './scan-modal.scss',
})
export class ScanModal implements OnInit, OnDestroy, AfterViewInit {
  @Input() title = '開始掃描'
  @Input() value = ''
  @Input() placeholder = ''
  @Output() onConfirm = new EventEmitter<string>()

  modal?: any
  modalEl?: any
  inputEl?: any
  @ViewChild('modal') modalRef!: ElementRef
  @ViewChild('input') inputRef!: ElementRef

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.modalEl = this.modalRef.nativeElement
    this.inputEl = this.inputRef.nativeElement
    
    let options = {
      backdrop: 'static'
      // keyboard: false
    }
    this.modal = new bootstrap.Modal(this.modalEl, options);

    $(this.modalEl).on('shown.bs.modal', () => {
      this.inputEl.focus()
    })
  }

  ngOnDestroy(): void {
    this.modal = null
  }

  init_events() {
    $(this.modalEl).on('shown.bs.modal', (event: any) => {
      this.inputEl.focus()
    })
  }

  show() {
    this.modal.show()
  }

  confirm() {
    this.modal.hide()

    let value = this.inputEl.value

    this.inputEl.value = ''
    this.onConfirm.emit(value)
  }

}
