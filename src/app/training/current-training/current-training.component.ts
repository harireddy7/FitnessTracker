import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertPopupComponent } from 'src/app/shared/alert-popup/alert-popup.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer;
  constructor(private dialog: MatDialog, public trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const step = this.trainingService.getCurrentExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(id: string) {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(AlertPopupComponent, {data: {
      progress: this.progress
    }});
    dialogRef.afterClosed().subscribe(result => {
       result ? this.trainingService.stopTraining(this.progress) : this.startOrResumeTraining();
    });
  }

}
