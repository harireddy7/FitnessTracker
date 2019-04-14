import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

@NgModule({
  declarations: [TrainingComponent, NewTrainingComponent, CurrentTrainingComponent, PastTrainingsComponent],
  imports: [
    SharedModule, TrainingRoutingModule
  ],
  exports: []
})
export class TrainingModule {}
