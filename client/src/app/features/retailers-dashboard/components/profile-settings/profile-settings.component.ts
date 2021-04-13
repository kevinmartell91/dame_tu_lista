import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RetailerStore } from 'src/app/core/retailer/services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { APP_CONFIG } from 'src/app/app.config';
import { getStoreNameDashFormat } from '../../helpers/profile-settings.helper';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass'],
})
export class ProfileSettingsComponent implements OnDestroy {
  accountRetailerForm: FormGroup;
  subscriptionRetailerStore: Subscription;
  retailer: Retailer;
  errorStoreNameExist: string = '';

  cities: string[];
  districts: string[];
  departments: string[];

  constructor(
    private fb: FormBuilder,
    public retailerStore: RetailerStore,
    private snackBarService: MatSnackBar
  ) {
    this.initForm();

    this.subscriptionRetailerStore = this.retailerStore.retailer$.subscribe(
      (y) => {
        console.log('ProfileSettingsComponent - subscriptionRetailerStore ');
        if (y != null) {
          this.retailer = y;
          console.log(
            'ProfileSettingsComponent - current retailer ',
            this.retailer
          );
          this.loadForm();
        } else {
        }
      }
    );
  }

  initForm() {
    this.accountRetailerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          // Validators.maxLength(20)
        ],
      ],
      imgUrl: [''],
      isDeliveryService: [false, Validators.required],
      isPickUpService: [false, Validators.required],
      deliveryInfo: [''],
      pickUpInfo: [''],
      phoneNumber: [
        'xxx-xxx-xxx',
        [
          Validators.required,
          // this.phoneNumberValidator,
          Validators.maxLength(9),
        ],
      ],
      address: this.fb.group({
        streetName: ['', [Validators.required]],
        streetNumber: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        department: ['', Validators.required],
        country: ['PE', Validators.required],
        reference: [''],
        details: [''],
      }),
    });

    this.loadCities();
    this.loadDistricts();
    this.loadDeparments();
    this.errorStoreNameExist =
      'El nombre de la tienda ya existe, elija otro porfavor';
  }

  loadForm() {
    this.accountRetailerForm = this.fb.group({
      name: [
        this.retailer.store.name,
        [
          Validators.required,
          // Validators.maxLength(20)
        ],
      ],
      imgUrl: [this.retailer.store.imgUrl],
      isDeliveryService: [
        this.retailer.store.isDeliveryService,
        Validators.required,
      ],
      isPickUpService: [
        this.retailer.store.isPickUpService,
        Validators.required,
      ],
      deliveryInfo: [this.retailer.store.deliveryInfo],
      pickUpInfo: [this.retailer.store.pickUpInfo],
      phoneNumber: [
        this.retailer.phoneNumber,
        [
          Validators.required,
          // this.phoneNumberValidator,
          Validators.maxLength(9),
        ],
      ],

      address: this.fb.group({
        streetName: [
          this.retailer.store.address.streetName,
          [Validators.required],
        ],
        streetNumber: [
          this.retailer.store.address.streetNumber,
          Validators.required,
        ],
        district: [this.retailer.store.address.district, Validators.required],
        city: [this.retailer.store.address.city, Validators.required],
        department: [
          this.retailer.store.address.department,
          Validators.required,
        ],
        country: [this.retailer.store.address.country, Validators.required],
        reference: [this.retailer.store.address.reference],
        details: [this.retailer.store.address.details],
      }),
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

  get storeName() {
    return getStoreNameDashFormat(this.accountRetailerForm.get('name').value);
  }
  get phoneNumber() {
    return this.accountRetailerForm.get('phoneNumber').value;
  }

  copyUrlStoreName(): void {
    let url = `${APP_CONFIG.appBaseUrl}/${this.storeName}`;
    this.copyText(url);
    this.openSnackBar(
      'Se copió la Url de tu tienda. Enviaselo a tus clientes por WhatsApp!',
      ''
    );
  }

  /* To copy any Text */
  copyText(val: string): void {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    console.log('phoneNumberValidator');
    const valid = false;
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } };
  }

  onFormSubmit() {
    this.retailerStore
      .updateRetailerStoreInfo(this.retailer._id, {
        store: this.accountRetailerForm.value,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.openSnackBar('Los datos de tu tienda fueron guardados.', '');
        } else {
          this.openSnackBar(this.errorStoreNameExist, '');
        }
      });
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
    this.cities = ['LIM'];
  }
  loadDeparments(): void {
    this.departments = ['LIM'];
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action, {
      duration: 5000,
    });
  }
}
