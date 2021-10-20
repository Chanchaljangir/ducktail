import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { StudentServiceService } from '../service/student-service.service';
declare var $;
@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  loading: boolean;
  stuData: any;

  constructor(private studentService: StudentServiceService, private ts: ToasterService,) {
  }

  ngOnInit() {
    this.getAllStudents()
  }
  getAllStudents() {
    this.studentService.getAllStudent().subscribe((res: any) => {
      this.loading = false;
      if (res.IsSuccess) {
        this.loading = false;
        this.stuData = res.Data;
      } else {
        this.loading = false;
        console.log("something wents wrong ");
        this.ts.pop("error", "", "data not fetched");
      }
    });
  }
  editRecord(id){
    
  }
}
