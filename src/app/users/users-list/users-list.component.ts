import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { UsersNewComponent } from '../users-new/users-new.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  columns = ['firstName', 'lastName', 'email', 'gender'];
  dataSource = new MatTableDataSource<User>();


  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.subscription = this.usersService.usersSubject$.subscribe((list: User[]) => {
      this.dataSource.data = list;
      console.log(list);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  add() {
    this.dialog.open(UsersNewComponent, {
      width: '400px'
    });
  }

}
