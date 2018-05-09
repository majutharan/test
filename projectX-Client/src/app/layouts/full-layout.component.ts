import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';



@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [UserService]

})
export class FullLayoutComponent implements OnInit {
  currentUser: User;
  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};
  userRole = false;
  private alive: boolean;

  constructor(private userService: UserService,
              private router: Router) {
    this.alive = true;
    IntervalObservable.create(1000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      });
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.role === 'SUPER_ADMIN') {
      this.userRole = false;
    }else  {
      this.userRole = true;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  profileView() {
this.router.navigateByUrl('/profileView');
    /*this.userService.view(this.currentUser.id).subscribe(data => {
      //this.model = data;
    });*/
  }
}
