import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmpForm!: FormGroup;
  constructor(public employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.addEmpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }
  addEmployee() {
    console.log('employee save clicked');
    console.log(this.addEmpForm.value);
    this.employeeService
      .addEmployeeData(this.addEmpForm.value)
      .subscribe((response) => {
        console.log('I am res', response);
      });
  }
}
