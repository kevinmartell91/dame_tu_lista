import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  loading = false;
  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
