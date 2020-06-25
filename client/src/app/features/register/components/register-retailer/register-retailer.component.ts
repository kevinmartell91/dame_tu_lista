import { Component, OnInit } from '@angular/core';
import { FormGroup,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VALIDATORS_PATTERNS } from '../../../../core/constants/validators-patterns';


@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.sass']
})
export class RegisterRetailerComponent implements OnInit {

  loading = false;
  registerRetailerForm: FormGroup;
  returnUrl: string;
  errorMessage = '';

  constructor(  private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.registerRetailerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      email: ['', Validators.pattern(VALIDATORS_PATTERNS.email)]
    }) 
  }
  
  onSubmit () {

  }

}
