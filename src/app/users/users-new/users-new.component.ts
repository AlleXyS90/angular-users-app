import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

  detailForm: FormGroup;
  genders = ['male', 'female'];

  constructor(
    private dialogRef: MatDialogRef<UsersNewComponent>,
    public snackBar: MatSnackBar,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.detailForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'gender': new FormControl('', Validators.required)
    });
  }

  get firstName() { return this.detailForm.get('firstName'); }
  get lastName() { return this.detailForm.get('lastName'); }
  get email() { return this.detailForm.get('email'); }
  get gender() { return this.detailForm.get('gender'); }

  add() {
    const user: User = {
      id: -1,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      gender: this.gender.value
    };

    this.usersService.add(user);

    this.snackBar.open('User added', '', {
      duration: 3000
    });

    this.dialogRef.close();
  }
}
