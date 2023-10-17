import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { AddMemberService } from '../../services/add-member.service';
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  userForm!: FormGroup;
  isError: boolean = false;

  genderOptions: any[] = [
    { label: 'Select Gender', value: null },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  constructor(private _formBuilder: FormBuilder,
              private _route: Router,
              private _addMemberService: AddMemberService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [null],
      elo: [null, [Validators.min(0), Validators.max(3000)]],
      gender: ['']
    });
  }

  checkUsernameAvailability() {
    const username = this.userForm.get('username')?.value;

    if (username) {
      this._addMemberService.checkUsernameExists(username).subscribe(usernameExists => {
        if (usernameExists) {
          this.userForm.get('username')?.setErrors({ usernameExists: true });
        } else {
          this.userForm.get('username')?.setErrors(null);
        }
      });
    }
  }

  checkEmailAvailability() {
    const email = this.userForm.get('email')?.value;

    if (email) {
      this._addMemberService.checkEmailExists(email).subscribe(emailExists => {
        if (emailExists) {
          this.userForm.get('email')?.setErrors({ emailExists: true });
        } else {
          this.userForm.get('email')?.setErrors(null);
        }
      });
    }
  }

  addUser() {
    if (this.userForm.valid && !this.isError) {
      this._addMemberService.addUser(this.userForm.value).pipe(
        tap(() => this._route.navigateByUrl('/home')),
        catchError(() => {
          this.toggleError();
          return EMPTY;
        })
      ).subscribe();
    }
  }

  modifyPassword(){

  }

  toggleError() {
    this.isError = !this.isError;
  }
}
