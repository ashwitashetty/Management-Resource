import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../service/project.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { EmployeeService } from "../service/employee.service";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
})
export class AddProjectComponent implements OnInit {
  addProjectForm!: FormGroup;

  dropdownSettings: IDropdownSettings = {};
  SelectedEmpId: any = [];
  selectedItems: any = [];
  employeeList:any=[];
  constructor(private projectService: ProjectService,private employeeService:EmployeeService) {}
  ngOnInit(): void {
    // this.dropdownList = [
    //   { item_id: 1, item_text: "Item1" },
    //   { item_id: 2, item_text: "Item2" },
    //   { item_id: 3, item_text: "Item3" },
    //   { item_id: 4, item_text: "Item4" },
    //   { item_id: 5, item_text: "Item5" },
    //   { item_id: 6, item_text: "Item6" },
    //   { item_id: 7, item_text: "Item7" },
    //   { item_id: 8, item_text: "Item8" },
    //   { item_id: 9, item_text: "Item9" },
    //   { item_id: 10, item_text: "Item10" },
    // ];
    this.allEmployeeList()

    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
    };
    this.addProjectForm = new FormGroup({
      name: new FormControl("", Validators.required),
      technologies: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      employees: new FormControl("", Validators.required),
      // employee:[this.selectedItems]
      // myItems: [this.selectedItems]
    });
  }
  onItemSelect(item: any) {
    console.log("onItemSelect", item.id);
    this.SelectedEmpId.push(item.id);
    console.log(this.SelectedEmpId);
  }
  onItemDeSelect(item: any) {
    const index = this.SelectedEmpId.indexOf(item.id);
    const element = this.SelectedEmpId.splice(index, 1);
    // console.log("index", index);
    console.log("after desel",this.SelectedEmpId);
  }
  addProject() {
    const UpdatedProjectForm = {
      ...this.addProjectForm.value,
      employees:this.SelectedEmpId
    }
    console.log("add project data", UpdatedProjectForm);
    this.projectService
      .addProjectData(UpdatedProjectForm)
      .subscribe((response) => {
        console.log("i am response for project added", response);
      });
    alert("added successfully");
    this.refreshPage();
  }
  allEmployeeList() {
    this.employeeService.getAllEmployeeDetails().subscribe((response) => {
      console.log("response getLst", response);
      this.employeeList = response;
    });
  }
  refreshPage() {
    window.location.reload();
  }
}
