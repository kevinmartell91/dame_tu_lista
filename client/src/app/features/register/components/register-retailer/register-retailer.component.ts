import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { VALIDATORS_PATTERNS } from '../../../../core/constants/validators-patterns';
import { RetailerStore } from "../.././../../core/retailer/services/retailer.store";

@Component({
  selector: 'app-register-retailer',
  templateUrl: './register-retailer.component.html',
  styleUrls: ['./register-retailer.component.sass']
})
export class RegisterRetailerComponent implements OnInit, OnDestroy {

  loading = false;
  registerRetailerForm: FormGroup;
  returnUrl: string;
  errorMessage = '';
  subscribe: Subscription;


  
  constructor(  
    private fb: FormBuilder,
    private retailerStore: RetailerStore,
    private snackBarService: MatSnackBar,
    private router: Router ) { 

  }
  ngOnInit(): void {
    this.registerRetailerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required],
      email: ['', Validators.pattern(VALIDATORS_PATTERNS.email)]
    }) 
    this.onChanges();
  }

  ngOnDestroy(){
    
  }

  onChanges(): void {
    const emailControl = this.registerRetailerForm.get('email');
    emailControl.valueChanges.subscribe(val => {
      
      val = val.toLowerCase();

      this.registerRetailerForm.get('email').setValue(val, {
        emitEvent: false,
        emitModelToViewChange: false
      });
    });
  }
  
  onSubmit () {

    this.loading = true;
    let newRetailer = this.deserialize();
    
    // console.log("onSubmit ()",newRetailer);
    this.subscribe = this.retailerStore.registerNewRetailer(newRetailer).subscribe(
      response => {
        if(response.success){
          
          this.openSnackBar("Creación de cuenta exitosa! Ingrese como usuario vendedor.","");
          this.loading = false;
          this.router.navigate(['/login']);


          this.registerRetailerForm.patchValue({
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

  deserialize(): Retailer {
    return new Retailer().deserialize(this.registerRetailerForm.value);
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBarService.open(message, action, {
      duration: 5000,
    });

  }

}

