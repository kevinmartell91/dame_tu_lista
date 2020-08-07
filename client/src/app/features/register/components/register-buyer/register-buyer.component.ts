import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuyerStore } from 'src/app/core/buyer/services/buyer.store';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { VALIDATORS_PATTERNS } from '../../../../core/constants/validators-patterns';


@Component({
  selector: 'app-register-buyer',
  templateUrl: './register-buyer.component.html',
  styleUrls: ['./register-buyer.component.sass']
})
export class RegisterBuyerComponent implements OnInit, OnDestroy {

  loading = false;
  registerBuyerForm: FormGroup;
  returnUrl: string;
  errorMessage = '';
  subscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    public buyerStore: BuyerStore,
    private snackBarService: MatSnackBar ,
    private router: Router) {

     }

  ngOnInit(): void {
    this.registerBuyerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required],
      email: ['', Validators.pattern(VALIDATORS_PATTERNS.email)],
      // phone_number: ['', Validators.required],
      // login_type: ['', Validators.required]
    }) 

    this.onChanges();
  }

  ngOnDestroy(){
  }

  onChanges(): void {
    const emailControl = this.registerBuyerForm.get('email');
    emailControl.valueChanges.subscribe(val => {
      
      val = val.toLowerCase();

      this.registerBuyerForm.get('email').setValue(val, {
        emitEvent: false,
        emitModelToViewChange: false
      });
    });
  }
  
  onSubmit () {

    this.loading = true;
    let newBuyer = this.deserialize();
    
    // console.log("onSubmit ()",newBuyer);
    this.subscribe = this.buyerStore.registerNewBuyer(newBuyer).subscribe(
      response => {
        if(response.success){
          
          this.openSnackBar("Creación de cuenta exitosa! Ingrese como usuario comprador.","");
          this.loading = false;
          this.router.navigate(['/login']);

          this.registerBuyerForm.patchValue({
            name: "",
            password: "",
            email: ""
          });
        
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

    // this.subscribe.unsubscribe();

  }

  deserialize(): Buyer {
    return new Buyer().deserialize(this.registerBuyerForm.value);
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBarService.open(message, action, {
      duration: 5000,
    });

  }

}
