import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    console.log('user-list 컴포넌트 ngOnInit() 호출됨');
    this.getAllUsers();
  }

  getAllUsers() {
    console.log('user-list 컴포넌트 getAllUsers() 호출됨');
    this.userService.findAll().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewUserPage() {
    this.router.navigate(['/user/create']);
  }

  editUserPage(user: User) {
    if (user) {
      this.router.navigate(['/user/edit', user.id]);
    }
  }

  deleteUser(user: User) {
    const flag = confirm(user.firstName + ' ' + user.lastName + ' 사용자를 정말로 삭제하시겠습니까?');
    if (flag) {
      if (user) {
        this.userService.deleteUserById(user.id).subscribe(
          res => {
            this.getAllUsers();
            /*this.router.navigate(['/user']);*/
            console.log('done');
          }
        );
      }
    } else {
      console.log('삭제 되지 않음');
    }
  }

}
