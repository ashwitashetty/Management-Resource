import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
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
  projectList: any= [];
  sortedProjects: any;
  sortedProjectList: any = [];
  error = new Subject<string>();
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
    this.allProjectList();
    localStorage.removeItem("EmployeeDetail");

  }

  allEmployeeList() {
    this.employeeService.getAllEmployeeDetails().subscribe(
      (response: EmployeeInfo[]) => {
        this.empList = response;
        console.log("emp list", this.empList);
        if (localStorage.getItem("EmployeeDetail")) {
          this.selectedEmp = JSON.parse(localStorage.getItem("EmployeeDetail"));
        } else {
          this.selectedEmp = this.empList[0];
        }
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  allProjectList() {
    this.sortedProjectList = [];
    this.projectService.getAllProjectDetails().subscribe(
      (response) => {
        this.projectList = response;
        this.sortedProjects = this.projectList.map((proj: any) => {
          proj.employees.map((i: any) => {
            if (i.id === this.selectedEmp.id) {
              this.sortedProjectList.push(proj.name);
            }
          });
        });
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  onSearch(event: any) {
    this.filteredString = event.target.value;
  }
}
