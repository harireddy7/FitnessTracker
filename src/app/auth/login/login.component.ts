import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  subs: Subscription;

  constructor(private authServie: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.subs = this.uiService.loadingStateChanges.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    // this.authServie.logout();
  }

  onSubmit(log: NgForm) {
    this.authServie.loginUser({
      email: log.value.email,
      password: log.value.psd
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
