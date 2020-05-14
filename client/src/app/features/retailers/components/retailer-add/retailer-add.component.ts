import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationStore } from "../../../../core/login/services/authentication.store";


@Component({
  selector: 'app-retailer-add',
  templateUrl: './retailer-add.component.html',
  styleUrls: ['./retailer-add.component.sass']
})
export class RetailerAddComponent implements OnInit {

  registerForm: FormGroup

  constructor( 
    private fb: FormBuilder,
    private authenticationStore: AuthenticationStore,
    private router: Router
  ) { 
    
    if(this.authenticationStore.loginUser) {
      // this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      login_type: ['retailer', Validators.required]
    }) 

  }

  onSubmit() {
      
  }

}
