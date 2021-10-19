import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
    { path: '', component: ViewStudentComponent },
    { path: 'student', component: AddStudentComponent },
    {path : 'view', component: ViewStudentComponent},
    {path : 'student/:id', component: EditStudentComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }

