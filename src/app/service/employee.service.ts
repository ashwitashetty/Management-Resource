import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  empNameList: any = [];
  BASE_URL = environment.url_api;
  constructor(private http: HttpClient) {}
  getAllEmployeeDetails() {
    console.log("base",this.BASE_URL)
    return this.http.get(`${this.BASE_URL}employees`);
  }
  addEmployeeData(data: any) {
    const name: string = data.name;
    this.empNameList.push(name);
    return this.http.post(`${this.BASE_URL}employees`, data);
  }
  getDesignationList() {
    return this.http.get(`${this.BASE_URL}designations`);
  }
}
