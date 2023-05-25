import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "../environment";
import { EmployeeInfo, ProjectInfo } from "../interface/interface.model";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  BASE_URL = environment.url_api;
  constructor(private http: HttpClient) {}
  employeeDetail: object;
  getProjDetail: BehaviorSubject<ProjectInfo[]> = new BehaviorSubject<
    ProjectInfo[]
  >([]);
  projectList$: Observable<ProjectInfo[]> = this.getProjDetail.asObservable();

  error = new Subject<string>();
  getAllProjectDetails() {
    this.http.get(`${this.BASE_URL}projects`).subscribe({
      next: (res: ProjectInfo[]) => {
        this.getProjDetail.next(res);
      },
    }),
      (error) => {
        console.log("errrr", error);
        this.error.next(error.message);
      };
  }
  ProjectDetailsUpdate() {
    return this.http.get(`${this.BASE_URL}projects`);
  }
  addProjectData(data: any) {
    this.http.post(`${this.BASE_URL}projects`, data).subscribe((res) => {
      this.getAllProjectDetails();
    }),
      (error) => {
        this.error.next(error.message);
      };
  }
  fetchProjectStatus(data: any, id: any) {
    return (
      this.http
        .put(`${this.BASE_URL}projects/${id}/update_status`, {
          status: data,
        })
        .subscribe((res) => {
          this.getAllProjectDetails();
        }),
      (error) => {
        this.error.next(error.message);
      }
    );
  }
}
