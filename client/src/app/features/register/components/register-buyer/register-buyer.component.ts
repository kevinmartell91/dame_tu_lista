import { Component, OnInit } from '@angular/core';
import { FormGroup,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
const emailValidator = Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$');

@Component({
  selector: 'app-register-buyer',
  templateUrl: './register-buyer.component.html',
  styleUrls: ['./register-buyer.component.sass']
})
export class RegisterBuyerComponent implements OnInit {

  registerBuyerForm: FormGroup;

  constructor(  private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.registerBuyerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      email: ['',emailValidator],
      phone_number: ['', Validators.required],
      login_type: ['', Validators.required]
    }) 
  }
  
  onSubmit () {

  }

}
