import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AddProjectComponent } from "../add-project/add-project.component";
import { EmployeeService } from "../service/employee.service";
import { ProjectService } from "../service/project.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  filteredProjectText: string = "";
  projectList: any;
  selectedProject: any;
  selectedIndex: any;
  status: any;
  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router
  ) {}
  ngOnInit(): void {
    localStorage.removeItem("EmployeeDetail");
    this.allProjectList();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: "500px",
      height: "600px",
    });
  }
  allProjectList() {
    this.projectService.getAllProjectDetails().subscribe((response) => {
      console.log("response of project get api", response);
      this.projectList = response;
      console.log("iam project list", this.projectList);
      this.selectedProject = this.projectList[0];
      console.log("emp", this.selectedProject);
    });
  }
  onProjectSearch(event: any) {
    console.log("search input", event.target.value);
    this.filteredProjectText = event.target.value;
  }
  clickedProject(data: any) {
    this.selectedProject = data;
    console.log("selectec proj", data);
  }
  onEmployeeClick(emp: {}) {
    console.log("****", emp);
    localStorage.setItem("EmployeeDetail", JSON.stringify(emp));
  }
  statusUpdate(state: string,id: any) {
    this.projectService.fetchProjectStatus(state,id).subscribe((response) => {
      this.status = response;
      this.projectService.getAllProjectDetails().subscribe((response) => {
        this.projectList = response;
        this.projectList.map((proj) => {
          if(this.selectedProject.id === proj.id){
            this.selectedProject = proj
          }
        })
      });
    })
  }
}
