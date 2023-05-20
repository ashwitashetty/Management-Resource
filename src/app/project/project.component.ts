import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject, Subscription } from "rxjs";
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
  filterlist: any;
  selectedProject: any;
  selectedIndex: any;
  status: any;
  error = new Subject<string>();
  sub = new Subscription;
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
        allProjectList: this.allProjectList.bind(this)
      },
      width: "500px",
      height: "600px",
    });
  }
  allProjectList() {
    console.log('all project list')
    this.projectService.getAllProjectDetails();
    this.sub = this.projectService.getProjDetail.subscribe((proj) => {
      this.projectList = proj;
      console.log('proj before unsub',proj)
      console.log('project list before unsub',this.projectList)
      this.selectedProject = this.projectList[0];
      // this.projectService.getProjDetail.unsubscribe();
      this.sub.unsubscribe()
      console.log('proj',proj)
      console.log('project lisr',this.projectList)
    });
    
  }
  onProjectSearch(event: any) {
    this.filteredProjectText = event.target.value;
  }
  clickedProject(data: any) {
    this.selectedProject = data;
    console.log("sele", this.selectedProject);
  }
  onEmployeeClick(emp: {}) {
    localStorage.setItem("EmployeeDetail", JSON.stringify(emp));
  }
  statusUpdate(state: string, id: number) {
    this.projectService.fetchProjectStatus(state, id);
    // this.projectService.ProjectDetailsUpdate().subscribe((res) => {
    //   this.projectList = res;
    //   console.log("ddddd", this.projectList);
    //   console.log("hhhh", this.selectedProject.id);
    //   this.projectList.map((proj) => {
    //     if(proj.id === this.selectedProject.id){
    //       console.log(" proj", proj);
    //       this.selectedProject = proj;
    //       console.log(" selected proj", this.selectedProject);
    //     }
    //   })
    //   // this.projectService.ProjectDetailsUpdate()
    // }),
    this.projectService.getProjDetail.subscribe((response) => {
      this.projectList = response;
      console.log("ddddd", this.projectList);
      console.log("hhhh", this.selectedProject.id);
      // this.selectedProjectDisplay(this.projectList)
      this.projectList.map((proj) => {
        if (proj.id === this.selectedProject.id) {
          console.log(" proj", proj);
          this.selectedProject = proj;
          console.log(" selected proj", this.selectedProject);
        }
      });
    }),
      (error) => {
        this.error.next(error.message);
      };
      // this.projectService.ProjectDetailsUpdate()
  }
}
