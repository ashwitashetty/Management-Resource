import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject, Subscription } from "rxjs";
import { AddProjectComponent } from "../add-project/add-project.component";
import { ProjectInfo } from "../interface/interface.model";
import { ProjectService } from "../service/project.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  filteredProjectText: string = "";
  projectList: ProjectInfo[];
  filterlist: any;
  selectedProject: any;
  selectedIndex: any;
  status: any;
  error = new Subject<string>();
  sub = new Subscription();
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
      data: {
        allProjectList: this.allProjectList.bind(this),
      },
      width: "500px",
      height: "600px",
    });
  }
  allProjectList() {
    // this.projectService.getAllProjectDetails();
    this.sub = this.projectService.projectList$.subscribe(
      (proj: ProjectInfo[]) => {
        this.projectList = proj;
        // this.sub.unsubscribe();
      }
      );
      this.selectedProject = this.projectList[0];
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
  statusUpdate(state: string, id: number) {
    this.projectService.fetchProjectStatus(state, id);
    this.projectService.projectList$.subscribe((response) => {
      this.projectList = response;

      this.projectList.map((proj) => {
        if (proj.id === this.selectedProject.id) {
          this.selectedProject = proj;
        }
      });
      // this.projectService.getAllProjectDetails()
      // this.allProjectList()
    }),
      (error) => {
        this.error.next(error.message);
      };
  }

}
