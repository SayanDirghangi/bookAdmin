

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

// import { errorDetails } from 'app/models/error';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPopupComponent implements OnInit {

  public errorData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ErrorPopupComponent>
  ) {}

  dialogClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.errorData = this.data?.errorData;
  }
}

