import { NgModule } from '@angular/core';
import {  MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule,
  MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatSelectModule, MatProgressSpinnerModule,
  MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule,
  MatToolbarModule, MatTabsModule, MatCardModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule,
    MatPaginatorModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatTabsModule,
    MatCardModule, MatSnackBarModule ],
  exports: [ MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule,
    MatPaginatorModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatTabsModule,
    MatCardModule, MatSnackBarModule]
})
export class MaterialModule { }
