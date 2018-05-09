import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService, UserService} from '../_services';
import {User} from '../_models';
import {current} from 'codelyzer/util/syntaxKind';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';

@Component({
  templateUrl: 'profile-view.component.html',
  providers: [UserService, AuthenticationService]
})
export class ProfileViewComponent implements OnInit {
  model: User = new User();
  disabled = true;
  editBtn = false;
  saveBtn = true;
  public currentUser: User;
  disabledEmail = true;
  private alive: boolean;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.alive = true;
    IntervalObservable.create(1000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      });
    this.userService.view(this.currentUser.id).subscribe(data => {
      this.model = data;
    });
  }

  edit() {
    this.editBtn = true;
    this.disabled = false;
    this.saveBtn = false;
    this.disabledEmail = true;
  }
  save() {
    console.log('modal.................');
    console.log(this.model);
    this.userService.update(this.model)
      .subscribe(
        data => {
          console.log('updated');
          this.authenticationService.login(this.model.email, this.model.password).subscribe();
          this.disabled = true;
          this.saveBtn = true;
          this.editBtn = false;
          this.disabledEmail = true;
        },
        error => {
        });
  }
}
