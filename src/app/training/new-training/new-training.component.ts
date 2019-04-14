import { UiService } from './../../shared/ui.service';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../Exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  selected;
  exercises: Exercise[];
  allSubscription: Subscription;
  subs: Subscription;
  isLoading = false;
  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit() {
    this.subs = this.uiService.loadingStateChanges.subscribe(load => this.isLoading = load);
    this.allSubscription = this.trainingService.allExercisesChanges.subscribe((exs: Exercise[]) => {
      this.exercises = exs;
    });
    this.trainingService.getExercises();
  }

  addTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.allSubscription) {
      this.allSubscription.unsubscribe();
    }
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
