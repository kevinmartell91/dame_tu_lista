import { Component, OnInit } from '@angular/core';
import { FormGroup,
  Validators,
  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VALIDATORS_PATTERNS } from '../../../../core/constants/validators-patterns';
import { RetailerStore } from "../.././../../core/retailer/services/retailer.store";
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(  
    private fb: FormBuilder,
    private retailerStore: RetailerStore,
    private snackBarService: MatSnackBar ) { 

    }

  ngOnInit(): void {
    this.registerRetailerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required],
      email: ['', Validators.pattern(VALIDATORS_PATTERNS.email)]
    }) 
  }
  
  onSubmit () {

    this.loading = true;
    let newRetailer = this.deserialize();
    
    // console.log("onSubmit ()",newRetailer);
    this.retailerStore.registerNewRetailer(newRetailer).subscribe(
      response => {
        if(response.success){
          
          this.openSnackBar("Se creó se usuario","Cerrar");
          this.loading = false;

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
  }

  deserialize(): Retailer {
    return new Retailer().deserialize(this.registerRetailerForm.value);
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action, {
      duration: 2000,
    });
  }

}

