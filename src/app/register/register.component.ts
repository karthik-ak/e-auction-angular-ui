import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    pinCode: new FormControl('',[Validators.pattern("^[0-9]{6,6}$"),Validators.minLength(6), Validators.maxLength(6)]),
    phone: new FormControl('',[Validators.pattern("^[0-9]{10,10}$"),Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(),
    role: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {

  }

  register() {

  }

  Clear(){
    this.registerForm.reset();
  }

}
