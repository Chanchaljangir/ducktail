import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { StudentServiceService } from '../service/student-service.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  loading: boolean = false;
  redirectURL = null;
  isSubmited: boolean = false;
  regNoError: boolean;
  firstNameError: boolean;
  classError: boolean;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  SubError: boolean;
  constructor(private fb: FormBuilder, private studentService: StudentServiceService,
    private router: Router,
    private ts: ToasterService,
  ) { }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.studentForm = this.fb.group({
      regNo: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: [""],
      class: ["", Validators.required],
      subject: this.fb.array([this.subject])
    });
  }
  get subject(): FormGroup {
    return this.fb.group({
      subjectName: ["", Validators.required],
      marks: [""],
    });
  }
  addSubject() {
    (this.studentForm.get("subject") as FormArray).push(this.subject);
  }
  removeSubject(id) {
    const removeFormArray = <FormArray>this.studentForm.get('subject');
    removeFormArray.removeAt(id);
    removeFormArray.markAsDirty();
    removeFormArray.markAsTouched();
  }
  onSubmitBtn() {
    this.isSubmited = true;
    this.regNoError = this.studentForm.controls.regNo.invalid;
    this.firstNameError = this.studentForm.controls.firstName.invalid;
    this.classError = this.studentForm.controls.class.invalid;
    this.SubError = this.studentForm.controls.subject.invalid;
    if (this.studentForm.valid) {
      this.loading = true;
      this.studentService.registerStudent(this.studentForm.value).subscribe((res: any) => {
        this.loading = false;
        if (res.IsSuccess) {
          this.loading = false;
          this.ts.pop("success", "", "Succfully registered");
          this.router.navigate(["/view"])
        } else {
          this.loading = false;
          this.ts.pop("error", "", "Something wents wrong");
          //console.log("error invalid ");
        }
      },
        (error) => {
          this.loading = false;
          //console.log(error);
        }
      );
    } else {
      this.ts.pop("error", "", "Please fill all require fields");
      this.regNoError = true;
      this.firstNameError = true;
    }
  }
}


