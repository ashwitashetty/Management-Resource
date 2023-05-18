import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {
  addEmpForm!: FormGroup;
  DesignationList: any;
  constructor(public employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.designationList();
    this.addEmpForm = new FormGroup({
      name: new FormControl("", Validators.required),
      designationId: new FormControl("", Validators.required),
      joiningDate: new FormControl("", Validators.required),
      technologies: new FormControl("", Validators.required),
    });
  }
  addEmployee() {
    this.employeeService
      .addEmployeeData(this.addEmpForm.value)
      .subscribe((response) => {});
    alert("Added successfully");
    this.refreshPage();
  }
  designationList() {
    this.employeeService.getDesignationList().subscribe((response) => {
      this.DesignationList = response;
    });
  }
  refreshPage() {
    window.location.reload();
  }
}
