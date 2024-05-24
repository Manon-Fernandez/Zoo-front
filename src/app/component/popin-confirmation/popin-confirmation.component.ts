import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-popin-confirmation',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './popin-confirmation.component.html',
  styleUrl: './popin-confirmation.component.css'
})
export class PopinConfirmationComponent {

  @Output()
  onSubmit:EventEmitter<boolean>;

  constructor(public dialogRef: MatDialogRef<PopinConfirmationComponent>) {
    this.onSubmit = new EventEmitter<boolean>();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.onSubmit.emit(true);
    this.dialogRef.close();
  }
}
