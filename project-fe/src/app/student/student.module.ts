import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [AddStudentComponent, EditStudentComponent, ViewStudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
