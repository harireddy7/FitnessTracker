import { UiService } from './../shared/ui.service';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  allExercisesChanges = new Subject<Exercise[]>();
  finishedExercisesChanges = new Subject<Exercise[]>();
  currentExerciseChanges = new Subject<Exercise>();
  allSubs: Subscription[] = [];

  availableExercises: Exercise[];
  currentExercise: Exercise;

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  getExercises() {
    this.uiService.loadingStateChanges.next(true);
    this.allSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(
      map(docsArray => {
        return docsArray.map(docs => {
          return {
            id: docs.payload.doc.id,
            name: docs.payload.doc.data()['name'],
            duration: docs.payload.doc.data()['duration'],
            calories: docs.payload.doc.data()['calories']
          };
        });
      })
    ).subscribe(exs => {
      this.uiService.loadingStateChanges.next(false);
      this.availableExercises = exs;
      this.allExercisesChanges.next(this.availableExercises);
    }));
  }

  getCurrentExercise() {
    return { ...this.currentExercise };
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.currentExerciseChanges.next(this.currentExercise);
  }

  completeExercise() {
    this.storeTrainingsToDB({ ...this.currentExercise, date: new Date(), state: 'completed' });
    this.currentExerciseChanges.next(null);
    this.currentExercise = null;
  }

  stopTraining(progress) {
    this.storeTrainingsToDB({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.currentExerciseChanges.next(null);
    this.currentExercise = null;
  }

  private storeTrainingsToDB(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  getFinishedTrainings() {
    this.allSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((doneEx: Exercise[]) => {
      this.finishedExercisesChanges.next(doneEx);
    }));
  }

  cancelSubscriptions() {
    this.allSubs.forEach(sub => sub.unsubscribe());
  }

}
