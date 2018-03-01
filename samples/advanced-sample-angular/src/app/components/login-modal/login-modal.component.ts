import { Component, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { SitecoreAuthService } from '../../sitecore-auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-login-modal]',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() username: string;
  @Input() password: string;
  loginFailed = false;

  constructor(
    private authService: SitecoreAuthService,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }

  login() {
    this.loginFailed = false;
    this.authService.login(this.username, this.password).subscribe((success) => {
      if (success) {
        this.dialogRef.close();
        // reload current route
        this.router.navigateByUrl(this.router.url);
        // display success message
        this.translate.get('LoginSuccess', { user: this.username }).subscribe((message) => {
          this.snackBar.open(message, null, {
            duration: 2000
          });
        });
      } else {
        this.loginFailed = true;
      }
    });
  }
}
