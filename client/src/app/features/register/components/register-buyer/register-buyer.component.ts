import { Component, OnInit } from '@angular/core';
import { FormGroup,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VALIDATORS_PATTERNS } from '../../../../core/constants/validators-patterns';
import { BuyerStore } from 'src/app/core/buyer/services/buyer.store';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-buyer',
  templateUrl: './register-buyer.component.html',
  styleUrls: ['./register-buyer.component.sass']
})
export class RegisterBuyerComponent implements OnInit {

  loading = false;
  registerBuyerForm: FormGroup;
  returnUrl: string;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public buyerStore: BuyerStore,
    private snackBarService: MatSnackBar ) {

     }

  ngOnInit(): void {
    this.registerBuyerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required],
      email: ['', Validators.pattern(VALIDATORS_PATTERNS.email)],
      // phone_number: ['', Validators.required],
      // login_type: ['', Validators.required]
    }) 
  }
  
  onSubmit () {

    this.loading = true;
    let newBuyer = this.deserialize();
    
    console.log("onSubmit ()",newBuyer);
    this.buyerStore.registerNewBuyer(newBuyer).subscribe(
      response => {
        if(response.success){
          
          this.openSnackBar("Se creó se usuario","Cerrar");
          this.loading = false;
        
        } else {
          
          if(response.data.code == 11000){
            this.errorMessage = "El correo ingresado ya existe. Intente con un nuevo correo.";
            this.loading = false;
          }
        }
      },
      errorMessage => {
        
        this.errorMessage = "En estos momentos tenemos problemas técnicos. Intente más tarde";
        this.loading = false;
      },
    );
  }

  deserialize(): Buyer {
    return new Buyer().deserialize(this.registerBuyerForm.value);
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action, {
      duration: 2000,
    });
  }

}
