import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackbar: MatSnackBar) { }

  loadingStateChanges = new Subject<boolean>();
  newTrainingLoading = new Subject<boolean>();
  pastTrainingLoading = new Subject<boolean>();

  openSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }

}
