import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  id: number;
  user: User;

  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private location: Location) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ])
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    /* edit form */
    if (this.id) {
      this.userService.findById(this.id).subscribe(
        user => {
          this.id = user.id;
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        },  error => {
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('>>> this.id  ' + this.id);
      /*if (this.id) { */
      if (typeof this.id !== 'undefined') {
        console.log('>>> update  ' + this.id);
        const user: User = new User(this.id,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value);
        this.userService.updateUser(user).subscribe(() => this.goBack());
      } else {
        console.log('>>> save  ' + this.id);
        const user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value);
        this.userService.saveUser(user).subscribe(() => this.goBack());

      }

      this.userForm.reset();
      /*this.router.navigate(['/user']);*/
      /*this.redirectUserPage(); */
    }
  }

  // redirectUserPage() {
  //   this.router.navigate(['/user']);
  //
  // }

}
