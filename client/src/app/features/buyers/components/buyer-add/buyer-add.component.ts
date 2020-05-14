import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger,
  state,
  style,
  animate,
  transition } from '@angular/animations';

import { AuthenticationStore } from "../../../../core/login/services/authentication.store";

@Component({
  selector: 'app-buyer-add',
  templateUrl: './buyer-add.component.html',
  styleUrls: ['./buyer-add.component.sass']
})
export class BuyerAddComponent implements OnInit {

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
      login_type: ['buyer', Validators.required]
    }) 

  }

  onSubmit() {
      
  }

}
