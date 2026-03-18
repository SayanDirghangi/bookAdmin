import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-authorised-pop',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './authorised-pop.component.html',
  styleUrls: ['./authorised-pop.component.scss']
})
export class AuthorisedPopComponent {
  readonly message: string;

  constructor(
    private readonly dialogRef: MatDialogRef<AuthorisedPopComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { msg?: string } | null
  ) {
    this.message =
      this.data?.msg ??
      'You do not have the necessary permissions to access this page.';
  }

  dialogClose(): void {
    this.dialogRef.close();
  }
}
