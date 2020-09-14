import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  usersSubject$: Subject<User[]> = new Subject<User[]>();

  constructor() { }

  add(user: User) {
    this.users.push(user);
    this.refreshList();
  }

  remove(id) {
    this.users = this.users.filter(x => x.id !== id);
    this.refreshList();
  }

  refreshList() {
    this.usersSubject$.next(this.users);
  }
}
