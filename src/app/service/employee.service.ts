import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "../environment";
import { EmployeeInfo } from "../interface/interface.model";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  empNameList: any = [];

  error = new Subject<string>();
  BASE_URL = environment.url_api;
  getEmpList: BehaviorSubject<EmployeeInfo[]> = new BehaviorSubject<
    EmployeeInfo[]
  >([]);
  employeeList$: Observable<EmployeeInfo[]> = this.getEmpList.asObservable();
  constructor(private http: HttpClient) {}

  getAllEmployeeDetails() {
    this.http.get(`${this.BASE_URL}employees`).subscribe({
      next: (response: EmployeeInfo[]) => {
        this.getEmpList.next(response);
      },
    }),
      (error) => {
        this.error.next(error.message);
      };
  }
  addEmployeeData(data: any) {
    // const name: string = data.name;
    // this.empNameList.push(name);
    return (
      this.http.post(`${this.BASE_URL}employees`, data).subscribe((res) => {
    
        this.getAllEmployeeDetails();
      }),
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  getDesignationList() {
    return this.http.get(`${this.BASE_URL}designations`);
  }
}
