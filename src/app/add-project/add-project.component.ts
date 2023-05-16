import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  addProjectForm!: FormGroup;
 constructor(private projectService:ProjectService){

 }
  ngOnInit(): void {
    this.addProjectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      technologies: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required),
      employee: new FormControl('',Validators.required),
    });
  }
  addProject() {
    console.log('project save clicked');
    console.log("add project data",this.addProjectForm.value);
    this.projectService.addProjectData(this.addProjectForm.value).subscribe((response)=>{
      console.log('i am response for project added',response)
    })
  }
}
