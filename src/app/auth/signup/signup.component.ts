import { UiService } from './../../shared/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  subs: Subscription;

  constructor(private authServie: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.subs = this.uiService.loadingStateChanges.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(reg: NgForm) {
    this.authServie.registerUser({
      email: reg.value.email,
      password: reg.value.psd
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
