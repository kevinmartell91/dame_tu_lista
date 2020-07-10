import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { FormGroup } from '@angular/forms';
import { APP_CONFIG } from 'src/app/app.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  loading = false;
  loginForm: FormGroup;

  loginUrl:string;

  constructor() { }

  ngOnInit(): void {
    this.loginUrl = APP_CONFIG.appBaseUrl + "/login";
  }

}
