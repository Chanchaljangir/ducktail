import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { StudentServiceService } from '../service/student-service.service';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentForm: FormGroup;
  loading: boolean = false;
  redirectURL = null;
  isSubmited: boolean = false;
  regNoError: boolean;
  firstNameError: boolean;
  classError: boolean;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  paramsId: any;
  constructor(private fb: FormBuilder, private studentService: StudentServiceService,
    private router: Router, private route: ActivatedRoute,
    private ts: ToasterService,
  ) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.paramsId = params['id'];
    })
    this.initForm();
    this.getStujectData();
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
      subjectName: [""],
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
  getStujectData() {
    this.studentService.getSpecificStudent(this.paramsId).subscribe((res: any) => {
      this.loading = false;
      if (res.IsSuccess) {
        this.loading = false;
        this.studentForm.patchValue(res.Data)
        this.studentForm.setControl("subject", this.setExistingSubject(res.Data.subject))
      } else {
        this.loading = false;
        console.log("something wents wrong ");
        this.ts.pop("error", "", "data not fetched");
      }
    });
  }
  setExistingSubject(data: any[]): FormArray {
    const formArray = new FormArray([]);
    data.forEach(subData => {
      formArray.push(this.fb.group({
        id: subData.id,
        subjectName: subData.subjectName,
        marks: subData.marks
      }))
    });
    return formArray;
  }
  onSubmitBtn() {
    this.isSubmited = true;
    this.regNoError = this.studentForm.controls.regNo.invalid;
    this.firstNameError = this.studentForm.controls.firstName.invalid;
    this.classError = this.studentForm.controls.class.invalid;

    if (this.studentForm.valid) {
      this.loading = true;
      this.studentService.updateStudent(this.paramsId ,this.studentForm.value).subscribe((res: any) => {
        this.loading = false;
        if (res.IsSuccess) {
          this.loading = false;
          this.ts.pop("success", "", "Succfully updated");
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
      console.log("fill all require fields")
      this.regNoError = true;
      this.firstNameError = true;
    }
  }
}



