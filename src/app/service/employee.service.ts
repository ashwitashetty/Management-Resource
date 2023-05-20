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
  getEmpList = new Subject<any>();
  error = new Subject<string>();
  BASE_URL = environment.url_api;
  constructor(private http: HttpClient) {}

  getAllEmployeeDetails() {
    return (
      this.http.get(`${this.BASE_URL}employees`).subscribe((response) => {
        this.getEmpList.next(response);
      }),
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  addEmployeeData(data: any) {
    const name: string = data.name;
    this.empNameList.push(name);
    return (
      this.http.post(`${this.BASE_URL}employees`, data).subscribe((res) => {
        // this.updatedEmpList.next(this.empNameList);
        // this.updatedEmpList.subscribe((i) => {
        //   this.getEmpList.next(i)
        // })
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
