import { Component, EventEmitter, OnInit } from "@angular/core";
import { CloseScrollStrategy } from "@angular/cdk/overlay";
import { MatDialog } from "@angular/material/dialog";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { EmployeeService } from "../service/employee.service";
import { ProjectService } from "../service/project.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  empList: any;
  selectedEmp: any;
  highlight = "";
  filteredString: string = "";
  selectedIndex: any;
  projectList: any;
  empDetail: boolean = false;
  sortedProjects: any;
  sortedProjectList: any = [];
  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeeService,
    public projectService: ProjectService
  ) {}
  ngOnInit(): void {
    // console.log("Gowri", this.projectService.employeeDetail);
    // console.log("selssss",this.employeeService.selectedEmp)
    // if (this.employeeService.selectedEmp === undefined) {
    //   this.allEmployeeList();
    // } else {
    //   this.employeeService.selectedEmp = this.projectService.employeeDetail;
    //   console.log("^^^^^",this.employeeService.selectedEmp)
    // }
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
    console.log("clicked data", data);
    console.log("filtered Sample", this.filteredString);
    // this.empDetail=!this.empDetail;
    this.selectedEmp = data;
    this.allProjectList();
    localStorage.removeItem("EmployeeDetail");
    this.empDetail = true;
  }

  allEmployeeList() {
    this.employeeService.getAllEmployeeDetails().subscribe((response) => {
      console.log("response getLst", response);
      this.empList = response;
      if (localStorage.getItem("EmployeeDetail")) {
        console.log("inside if", localStorage.getItem("EmployeeDetail"));
        this.selectedEmp = JSON.parse(localStorage.getItem("EmployeeDetail"));
      } else {
        this.selectedEmp = this.empList[0];
        console.log("inside else", localStorage.getItem("EmployeeDetail"));
        console.log(this.selectedEmp);
      }
    });
  }
  allProjectList() {
    this.sortedProjectList = [];
    this.projectService.getAllProjectDetails().subscribe((response) => {
      console.log("response of project get api", response);
      this.projectList = response;
      this.sortedProjects = this.projectList.map((proj: any) => {
        proj.employees.map((i: any) => {
          if (i.id === this.selectedEmp.id) {
            this.sortedProjectList.push(proj.name);
          }
        });
      });
      console.log("ppppp", this.sortedProjectList);
    });
  }
  onSearch(event: any) {
    console.log("search input", event.target.value);
    this.filteredString = event.target.value;
  }
}
