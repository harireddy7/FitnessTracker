import { UiService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { UserData } from './user.model';
import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserData;
  authSubject = new Subject<boolean>();
  isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanges.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => this.uiService.loadingStateChanges.next(false))
    .catch(err => {
      this.uiService.openSnackbar(err.message, null, 3000);
      this.uiService.loadingStateChanges.next(false);
    });
  }

  loginUser(authData: AuthData) {
    this.uiService.loadingStateChanges.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => this.uiService.loadingStateChanges.next(false))
    .catch(err => {
      this.uiService.openSnackbar(err.message, null, 3000);
      this.uiService.loadingStateChanges.next(false);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.isAuthenticated = true;
        this.authSubject.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authSubject.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  isAuth() {
    return this.isAuthenticated;       // true if not null, false if null
  }


}
