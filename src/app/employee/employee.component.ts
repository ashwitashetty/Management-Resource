import { CloseScrollStrategy } from "@angular/cdk/overlay";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { EmployeeService } from "../service/employee.service";

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

  // empList: any = ['ashu', 'shetty', 'tanvi', 'gowri', 'noor', 'pooja'];
  // empList: any = [
  //   {
  //     name: 'ashwitha',
  //     des: 'soft',
  //   },
  //   {
  //     name: 'gowri',
  //     des: 'train',
  //   },
  //   {
  //     name: 'harshitha',
  //     des: 'Dev',
  //   },

  // ];
  empDetail: boolean = false;
  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.allEmployeeList();
    // console.log('iam emp list', this.empList);
    // console.log('I am from emp service', this.employeeService.empNameList);
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
    this.empDetail = true;
  }

  allEmployeeList() {
    this.employeeService.getAllEmployeeDetails().subscribe((response) => {
      console.log("response getLst", response);
      this.empList = response;

      this.selectedEmp = this.empList[0];
      console.log("emp", this.selectedEmp);
    });
  }
  onSearch(event: any) {
    console.log("search input", event.target.value);
    this.filteredString = event.target.value;
  }

  public setRow(_index: any) {
    this.selectedIndex = _index;
  }
}
