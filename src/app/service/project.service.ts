import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../environment";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  BASE_URL = environment.url_api;
  constructor(private http: HttpClient) {}
  employeeDetail: object;
  getProjDetail = new Subject<any>();
  error = new Subject<string>();
  getAllProjectDetails() {
    return (
      this.http.get(`${this.BASE_URL}projects`).subscribe((res) => {
        this.getProjDetail.next(res);
      }),
      (error) => {
        this.error.next(error.message);
      }
    );
  }
  ProjectDetailsUpdate() {
    return (
      this.http.get(`${this.BASE_URL}projects`)
    );
  }
  addProjectData(data: any) {
    return (
      this.http.post(`${this.BASE_URL}projects`, data)
      // .subscribe((res) => {

      //   // this.getAllProjectDetails()
      // }),
      // (error) => {
      //   this.error.next(error.message);
      // }
    );
  }
  fetchProjectStatus(data: any, id: any) {
    return this.http.put(`${this.BASE_URL}projects/${id}/update_status`, {
      status: data,
    }).subscribe((res) => {
      // this.ProjectDetailsUpdate()
      this.getAllProjectDetails();
    }),
    (error) => {
      this.error.next(error.message);
    }
  }
}
