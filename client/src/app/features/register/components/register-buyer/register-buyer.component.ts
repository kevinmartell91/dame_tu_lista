import { Component, OnInit } from '@angular/core';
import { FormGroup,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VALIDATORS_PATTERNS } from '../../../../core/constants/validators-patterns';


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
      email: ['', Validators.pattern(VALIDATORS_PATTERNS.email)],
      phone_number: ['', Validators.required],
      login_type: ['', Validators.required]
    }) 
  }
  
  onSubmit () {

  }

}
