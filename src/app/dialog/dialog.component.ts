import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from '../../core/services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  providers: [DialogService],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() {}

  confirmDialog() {
    this.confirm.emit();
    this.closeDialog();
  }

  closeDialog() {
    this.close.emit();
  }
}

export enum MessageType {
  CONFIRMATION = 'CONFIRMATION',
  ALERT = 'ALERT'
}