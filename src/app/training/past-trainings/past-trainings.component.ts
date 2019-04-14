import { UiService } from './../../shared/ui.service';
import { TrainingService } from './../training.service';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Exercise } from '../Exercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  doneExSubscription: Subscription;
  subs: Subscription;
  isLoading = false;

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit() {
    this.subs = this.uiService.loadingStateChanges.subscribe(load => this.isLoading = load);
    this.doneExSubscription = this.trainingService.finishedExercisesChanges.subscribe((donex: Exercise[]) => {
      this.dataSource.data = donex;
    });
    this.trainingService.getFinishedTrainings();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.doneExSubscription) {
      this.doneExSubscription.unsubscribe();
    }
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
