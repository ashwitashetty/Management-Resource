import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./service/employee.service";
import { ProjectService } from "./service/project.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ProjectManagement";
  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.projectService.getAllProjectDetails();
    this.employeeService.getAllEmployeeDetails();
  }
}
