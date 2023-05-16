import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projectList: any = [
    {
      projectname: 'project 1',
      projectStatus: 'yet to start',
    },
    {
      projectname: 'project 1',
      projectStatus: 'yet to start',
    },
    {
      projectname: 'project 1',
      projectStatus: 'yet to start',
    },
    {
      projectname: 'project 1',
      projectStatus: 'yet to start',
    },
    {
      projectname: 'project 1',
      projectStatus: 'yet to start',
    },
  ];
  // projectList:any;
  constructor(public dialog: MatDialog,private projectService:ProjectService) {}
  ngOnInit(): void {
    // this.allProjectList();
    console.log(" iam in init of project",this.projectList)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '500px',
      height: '600px',
    });
  }
  // allProjectList(){
  //   this.projectService.getAllProjectDetails().subscribe((response)=>{
  //     console.log('response of project get api',response);
  //     this.projectList=response;
  //     console.log("iam project list",this.projectList)
  //   })
  // }
}
