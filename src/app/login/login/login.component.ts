import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  onLogin() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/seller/dashboard']);
  }

  onSignUp() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/register/register']);
  }
}
