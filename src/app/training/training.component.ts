import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  currentTraining = false;
  subscription: Subscription;
  loading = false;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    console.log('module loaded');
    this.subscription = this.trainingService.currentExerciseChanges.subscribe(ex => {
      if (ex) {
        this.currentTraining = true;
      } else {
        this.currentTraining = false;
      }
    });
  }

  setCurrentTraining(val) {
    this.trainingService.currentExerciseChanges.subscribe(ex => {
      if (ex) {
        this.currentTraining = true;
      } else {
        this.currentTraining = false;
      }
    });
  }

  exitCurrentTraining(val) {
    this.currentTraining = false;
    this.trainingService.stopTraining(val);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
