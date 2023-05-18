import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddProjectComponent } from "../add-project/add-project.component";
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
    private projectService: ProjectService
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
      this.projectList = response;
      this.selectedProject = this.projectList[0];
    });
  }
  onProjectSearch(event: any) {
    this.filteredProjectText = event.target.value;
  }
  clickedProject(data: any) {
    this.selectedProject = data;
  }
  onEmployeeClick(emp: {}) {
    localStorage.setItem("EmployeeDetail", JSON.stringify(emp));
  }
  statusUpdate(state: string, id: any) {
    this.projectService.fetchProjectStatus(state, id).subscribe((response) => {
      this.status = response;
      this.projectService.getAllProjectDetails().subscribe((response) => {
        this.projectList = response;
        this.projectList.map((proj) => {
          if (this.selectedProject.id === proj.id) {
            this.selectedProject = proj;
          }
        });
      });
    });
  }
}
