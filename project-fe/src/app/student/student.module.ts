import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [AddStudentComponent, EditStudentComponent, ViewStudentComponent],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StudentRoutingModule,
    ToasterModule
  ],
  providers: [ToasterService],
})
export class StudentModule { }
