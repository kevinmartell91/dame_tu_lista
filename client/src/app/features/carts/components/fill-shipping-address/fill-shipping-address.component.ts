import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/core/buyer/types/address';
import { Buyer } from 'src/app/core/buyer/types/buyer';
import { AuthenticationStore } from 'src/app/core/login/services/authentication.store';

@Component({
  selector: 'app-fill-shipping-address',
  templateUrl: './fill-shipping-address.component.html',
  styleUrls: ['./fill-shipping-address.component.sass'],
})
export class FillShippingAddressComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  phoneNumberForm: FormGroup;
  loading: boolean;
  errorMessage: string;
  districts: string[];
  cities: string[];

  subscription: Subscription;
  buyer: Buyer;
  address: Address = null;
  // isCheckedSaveAddress: boolean = false;

  isPickUp: boolean = true;
  pickUpMessage: string = '';
  deliveryMessage: string = '';

  @Output() addressFilled = new EventEmitter<any>();

  constructor(
    private authenticationStore: AuthenticationStore,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FillShippingAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadDistricts();
    this.loadCities();

    this.address = data.address;
    this.deliveryMessage =
      'Olvídese de completar multiples campos de dirección. Su tiempo es valioso.';

    this.subscription = this.authenticationStore.loginUser$.subscribe((x) => {
      if (x.login_type == 'buyer') {
        this.buyer = new Buyer().deserialize(x.entity);
      }
    });
  }
  // Todo comment the unnecessary fields
  ngOnInit(): void {
    if (this.address == undefined) {
      this.addressForm = this.fb.group({
        // streetName: ['', Validators.required],
        // streetNumber: ['', Validators.required],
        // district: ['', Validators.required],
        // apartmentNumber: [''],
        // city: ['', Validators.required],
        // // isSaveAsFrequentAddress: [false],
        // department: ['LIM', Validators.required],
        // country: ['PE', Validators.required],
        reference: [''],
        details: ['', Validators.required],
      });
    } else {
      this.addressForm = this.fb.group({
        // streetName: [this.buyer.address.streetName, Validators.required],
        // streetNumber: [this.buyer.address.streetNumber, Validators.required],
        // apartmentNumber: [this.buyer.address.apartmentNumber],
        // district: [this.buyer.address.district, Validators.required],
        // city: [this.buyer.address.city, Validators.required],
        // // isSaveAsFrequentAddress: [false],
        // department: ['LIM', Validators.required],
        // country: ['PE', Validators.required],
        reference: [this.buyer.address.reference],
        details: [this.buyer.address.details],
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // onSubmit() { }
  // replaced by
  // <button mat-button [mat-dialog-close]="adresstForm.value">
  // the from is send to the parent through [mat-dialog-close] in .html

  onNoClick(): void {
    this.matDialogRef.close();
  }

  loadDistrictsLowerCase(): void {
    this.districts = [
      'Ancón',
      'Ate',
      'Baranco',
      'Breña',
      'Carabayllo',
      'Chaclacayo',
      'Chorrillos',
      'Cieneguilla',
      'Comas',
      'El Agustino',
      'Independencia',
      'Jesús María',
      'La Molina',
      'La Victoria',
      'Lima',
      'Lince',
      'Los Olivos',
      'Lurigancho-Chosica',
      'Lurín',
      'Magdalena del Mar',
      'Miraflores',
      'Pachacámac',
      'Pucusana',
      'Pueblo libre',
      'Puente Piedra',
      'Punta Hermosa',
      'Punta Negra',
      'Rímac',
      'San Bartolo',
      'San Borja',
      'San Isidro',
      'San Juan de Lurigancho',
      'San Juan de Miraflores',
      'San Luis',
      'San Martin de Porres',
      'San Miguel',
      'Santa Anita',
      'Santa María del Mar',
      'Santa Rosa',
      'Santiago de Surco',
      'Surquillo',
      'Villa el Salvador',
      'Villa María del Triunfo',
    ];
  }

  loadDistricts(): void {
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
      'VILLA MARIA DEL TRIUNFO',
    ];
  }

  loadCities(): void {
    this.cities = ['LIM', 'HYO'];
  }
  updateSlide(): void {
    // this.isPickUp = value;
  }

  updateValue(value: boolean): void {
    this.isPickUp = value;

    if (this.isPickUp) {
      this.pickUpMessage =
        'Usted podrá recoger su orden en el horario de atención establecido por el vendedor.';
      this.addressForm.patchValue({
        // streetName: 'Recojo en tienda',
        // streetNumber: 'Recojo en tienda',
        // apartmentNumber: '',
        // district: 'Tienda',
        // city: 'LIM',
        details: 'pickup',
      });
    } else {
      this.addressForm.patchValue({
        // streetName: '',
        // streetNumber: '',
        // district: '',
        // city: '',
        details: '',
        // streetName: '',
        // streetNumber: '',
        // apartmentNumber: '',
        // city: '',
        // district: '',
        // reference: '',
        // details: '',
      });
    }
  }
}
