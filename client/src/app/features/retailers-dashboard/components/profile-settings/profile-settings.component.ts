import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RetailerStore } from 'src/app/core/retailer/services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnDestroy {

  accountRetailerForm: FormGroup;
  subscriptionRetailerStore: Subscription;
  retailer: Retailer;

  cities: string [];
  districts: string [];
  departments: string [];

  constructor(
    private fb: FormBuilder,
    public retailerStore: RetailerStore,
    private snackBarService: MatSnackBar
  ) { 

    this.initForm();

    this.subscriptionRetailerStore =  this.retailerStore.retailer$.subscribe(
      y => {
        if(y != null){
          this.retailer = y;
          this.loadForm();
        }
      }
    )
  }

  initForm(){

    this.accountRetailerForm = this.fb.group({  

      name: ["",
        [Validators.required,
        Validators.maxLength(20)]],
      imgUrl:["../../../assets/fruit-images/fruits_portal_img.jpg",Validators.required],
      isDeliveryService:[false, Validators.required],
      isPickUpService:[false, Validators.required],
      deliveryInfo:[""],
      pickUpInfo:[""],
      
      address: this.fb.group({
        streetName:["",[Validators.required]],
        streetNumber:["",Validators.required],
        district:["",Validators.required],
        city:["",Validators.required],
        department:["",Validators.required],
        country:["PE",Validators.required],
        reference:[""],
        details:[""]
      })
    });
    
    this.loadCities();
    this.loadDistricts();
    this.loadDeparments();
    
  }

  loadForm() {

    this.accountRetailerForm = this.fb.group({  
  
      name: [
        this.retailer.store.name, 
        [Validators.required,
        Validators.maxLength(20)]],
      imgUrl: [this.retailer.store.imgUrl, Validators.required],
      isDeliveryService: [this.retailer.store.isDeliveryService, Validators.required],
      isPickUpService: [this.retailer.store.isPickUpService, Validators.required],
      deliveryInfo: [this.retailer.store.deliveryInfo],
      pickUpInfo: [this.retailer.store.pickUpInfo],
      
      address: this.fb.group({
        streetName: [ this.retailer.store.address.streetName, [Validators.required]],
        streetNumber: [ this.retailer.store.address.streetNumber, Validators.required],
        district: [ this.retailer.store.address.district, Validators.required],
        city: [ this.retailer.store.address.city, Validators.required],
        department: [ this.retailer.store.address.department, Validators.required],
        country: [ this.retailer.store.address.country, Validators.required],
        reference: [ this.retailer.store.address.reference],
        details: [ this.retailer.store.address.details]
      })
    });
 
  }

  ngOnDestroy() {
    this.subscriptionRetailerStore.unsubscribe();
  }

  get isDeliveryService() {
    return this.accountRetailerForm.get('isDeliveryService').value;
  }

  get isPickUpService() {
    return this.accountRetailerForm.get('isPickUpService').value;
  }

  onFormSubmit() {
    // console.log("KEIVN");
    // console.log(JSON.stringify(this.accountRetailerForm.value, null, 2));

    this.retailerStore.updateRetailerStoreInfo(
      this.retailer._id,
      {store: this.accountRetailerForm.value}
    );

    this.openSnackBar("Los datos de tu tienda fueron guardados.","");
  }

  loadDistricts():void {
    this.districts = [ 
      'ANCÓN',
      'ATE',
      'BARRANCO',
      'BREÑA',
      'CARABAYLLO',
      'CHACLACAYO',
      'CHORRILLOS',
      'CIENEGUILLA',
      'COMAS',
      'EL AGUSTINO',
      'INDEPENDENCIA',
      'JESÚS MARÍA',
      'LA MOLINA',
      'LA VICTORIA',
      'LIMA',
      'LINCE',
      'LOS OLIVOS',
      'LURIGANCHO-CHOSICA',
      'LURÍN',
      'MAGDALENA DEL MAR',
      'MIRAFLORES',
      'PACHACÁMAC',
      'PUCUSANA',
      'PUEBLO LIBRE',
      'PUENTE PIEDRA',
      'PUNTA HERMOSA',
      'PUNTA NEGRA',
      'RÍMAC',
      'SAN BARTOLO',
      'SAN BORJA',
      'SAN ISIDRO',
      'SAN JUAN DE LURIGANCHO',
      'SAN JUAN DE MIRAFLORES',
      'SAN LUIS',
      'SAN MARTIN DE PORRES',
      'SAN MIGUEL',
      'SANTA ANITA',
      'SANTA MARÍA DEL MAR',
      'SANTA ROSA',
      'SANTIAGO DE SURCO',
      'SURQUILLO',
      'VILLA EL SALVADOR',
      'VILLA MARIA DEL TRIUNFO'
    ]
  }
  
  loadCities(): void {
    this.cities = ['LIM'];

  }
  loadDeparments(): void {
    this.departments = ['LIM'];

  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action, {
      duration: 2000,
    });

  }

  // this.user = this.userService
  // .loadUser()
  // .pipe(tap(user => this.form.patchValue(user)));

// API Data returned has the same property names as the form control names
// making it easier to assign the form values with patchValue
// {
//  id: 0,
//  firstName: "Cory",
//  lastName: "Rylan",
//  about: "Web Developer"
// }

  /**
   * {
  "store": {
    "name": "La tienda de Irene",
    "imgUrl": "../../../assets/fruit-images/fruits_portal_img.jpg",
    "isDeliveryService": true,
    "isPickUpService": true,
    "deliveryInfo": "De 9hrs a 13hrs",
    "pickUpInfo": "De 10hrs a 14hrs",
    "address": {
      "streetName": "Dante",
      "streetnumber": "343",
      "district": "Surquillo",
      "city": "LIM",
      "department": "LIM",
      "country": "PE",
      "reference": "Frente al parque XXXX",
      "details": "A unos metros de la comisaria"
    }
  }
   */


}
