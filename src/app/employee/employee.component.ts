import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Subject } from "rxjs";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { EmployeeInfo, ProjectInfo } from "../interface/interface.model";
import { EmployeeService } from "../service/employee.service";
import { ProjectService } from "../service/project.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  empList: EmployeeInfo[] = [];
  selectedEmp: any;
  filteredString: string = "";
  selectedIndex: any;
  EmployeeprojectList: ProjectInfo[] = [];
  sortedProjects: any = [];
  sortedProjectList: any = [];
  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeeService,
    public projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.allEmployeeList();
    this.allProjectList();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "500px",
      height: "600px",
    });
  }
  clickedEmp(data: any) {
    this.selectedEmp = data;
    this.individualEmpDetails(data)
    localStorage.removeItem("EmployeeDetail");
  }

  allEmployeeList() {
    // this.employeeService.getAllEmployeeDetails();
    this.employeeService.employeeList$.subscribe((user:EmployeeInfo[]) => {
      this.empList = user;
      if (localStorage.getItem("EmployeeDetail")) {
        this.selectedEmp = JSON.parse(localStorage.getItem("EmployeeDetail"));
      } else {
        this.selectedEmp = this.empList[0];
      }
    });
  }
  allProjectList() {
    // this.projectService.getAllProjectDetails();
    this.projectService.projectList$.subscribe((proj:ProjectInfo[]) => {
      this.EmployeeprojectList = proj;
      this.individualEmpDetails(this.selectedEmp)
    });

  }
  onSearch(event: any) {
    this.filteredString = event.target.value;
  }
  individualEmpDetails(data: any) {
    this.sortedProjectList = [];
    this.EmployeeprojectList.map((proj: any) => {
      proj.employees.map((i: any) => {
        if (i?.id === data?.id) {
          this.sortedProjectList.push(proj.name);
        }
      });
    });
  }
}
