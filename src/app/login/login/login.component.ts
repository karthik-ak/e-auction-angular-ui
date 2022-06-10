import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roleId: number = 0;

  constructor(private authService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('isSeller', 'false');
    localStorage.setItem('isBuyer', 'false');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roleId = this.tokenStorage.getUser().roleId;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedin', 'true');
        this.roleId = this.tokenStorage.getUser().roleId;

        if (this.roleId == 1) {
          localStorage.setItem('isSeller', 'true');
          this.router.navigate(['/seller/dashboard']);
        }
        else if (this.roleId == 2) {
          localStorage.setItem('isBuyer', 'true');
          this.router.navigate(['/buyer/dashboard']);
        }
        else {
          this.errorMessage ="Role is not defined properly"
          this.isLoginFailed = true;
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedin', 'false');
      }
    });
  }
  onSignUp() {
    this.isLoginFailed = true;
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedin', 'false');
    this.router.navigate(['/register/register']);
  }
  reloadPage(): void {
    window.location.reload();
  }
}
