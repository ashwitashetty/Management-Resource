import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../service/project.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { EmployeeService } from "../service/employee.service";
import { Subject } from "rxjs";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
})
export class AddProjectComponent implements OnInit {
  addProjectForm!: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  SelectedEmpId: any = [];
  selectedItems: any = [];
  employeeList: any = [];
  error = new Subject<string>();

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.allEmployeeList();
    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
    };
    this.addProjectForm = new FormGroup({
      name: new FormControl("", Validators.required),
      technologies: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      employees: new FormControl("", Validators.required),
    });
  }
  onItemSelect(item: any) {
    this.SelectedEmpId.push(item.id);
  }
  onItemDeSelect(item: any) {
    const index = this.SelectedEmpId.indexOf(item.id);
    const ele = this.SelectedEmpId.splice(index, 1);
  }
  addProject() {
    const UpdatedProjectForm = {
      ...this.addProjectForm.value,
      employees: this.SelectedEmpId,
    };
    this.projectService.addProjectData(UpdatedProjectForm).subscribe(res => {
      this.data.allProjectList()
    })
  }
  allEmployeeList() {
    this.employeeService.getAllEmployeeDetails()
    this.employeeService.getEmpList.subscribe((user) => {
      this.employeeList = user;
    })
  }
}