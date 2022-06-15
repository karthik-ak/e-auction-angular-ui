import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  roles: Role[] = [
    { name: 'Seller', id: 1 },
    { name: 'Buyer', id: 2 }
  ];

  registerForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.pattern("^[a-z0-9$@$!%*?&#]{8,20}$")
      ]),
    roleId: new FormControl()
  });

  constructor(private registerService: RegisterService,
    private router: Router) { }

  ngOnInit(): void {

  }

  register() {
    if (this.registerForm.valid) {
      this.registerService.RegisterUser(this.registerForm.value).subscribe(data => {
        //if (data) {
        this.registerForm.reset();
        alert("Registration completed successfully!");
        this.router.navigateByUrl('/login');
        //}
      },
        error => {
          if (error.error.indexOf("Email already exist") > 1)
            alert(`Email already exist!`);
          else
            alert(`Registration failed!`);
          throw error;
        }
      );
    }
  }

  Clear() {
    this.registerForm.reset();
  }

}

interface Role {
  name: string;
  id: number;
}